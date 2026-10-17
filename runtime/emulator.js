// Source metadata evaluation is offline.
if (!globalThis.ManaHTTP) {
  throw new Error('Shared HTTP runtime must be loaded before the emulator');
}

Object.assign(globalThis, globalThis.ManaHTTP);
globalThis.__manaHTTPBridge = {
  metadataOnly: true,
  now: () => 0,
  send: async () => {
    throw new Error('Network access is unavailable during source metadata evaluation');
  },
};

// Buffer polyfill for bare V8 environment (no Node.js, no TextEncoder)
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = {
    from: (data, encoding) => {
      if (typeof data === 'string') {
        const arr = [];
        for (let i = 0; i < data.length; i++) arr.push(data.charCodeAt(i) & 0xff);
        return new Uint8Array(arr);
      }
      return new Uint8Array(data);
    },
    alloc: (size) => new Uint8Array(size),
    isBuffer: (obj) => obj instanceof Uint8Array,
    concat: (buffers) => {
      const total = buffers.reduce((acc, b) => acc + b.length, 0);
      const result = new Uint8Array(total);
      let offset = 0;
      for (const b of buffers) { result.set(b, offset); offset += b.length; }
      return result;
    },
  };
}

// src/classes.ts
var globalObject = global;
var GlobalStore = class {
  constructor() {
    this.secure = {};
    this.objects = {};
  }
};
var globalStore = new GlobalStore();
var ManaStore = class {
  constructor(key) {
    this.store = key;
  }
  async get(key) {
    const value = this.store == "ss" ? globalStore.secure[key] : globalStore.objects[key];
    return value ? JSON.parse(value) : null;
  }
  async set(key, value) {
    const v = JSON.stringify(value);
    this.store == "ss" ? globalStore.secure[key] = v : globalStore.objects[key] = v;
  }
  async remove(key) {
    if (this.store == "ss") delete globalStore.secure[key];
    else delete globalStore.objects[key];
  }
  async string(key) {
    const value = await this.get(key);
    if (!value) return null;
    if (typeof value !== "string")
      throw new Error(
        "ObjectStore Type Assertion failed, value is not a string"
      );
    return value;
  }
  async boolean(key) {
    const value = await this.get(key);
    if (!value) return null;
    if (typeof value !== "boolean")
      throw new Error(
        "ObjectStore Type Assertion failed, value is not a boolean"
      );
    return value;
  }
  async number(key) {
    const value = await this.get(key);
    if (!value) return null;
    if (typeof value !== "number")
      throw new Error(
        "ObjectStore Type Assertion failed, value is not a number"
      );
    return value;
  }
  async stringArray(key) {
    const value = await this.get(key);
    if (!value) return null;
    if (typeof value !== "object" || !Array.isArray(value))
      throw new Error(
        "ObjectStore type assertion failed, value is not an array"
      );
    if (!value?.[0]) return value;
    const isValid = value.every((v) => typeof v === "string");
    if (!isValid)
      throw new Error(
        `ObjectStore Type Assertion Failed, Elements of Array are not of type string`
      );
    return value;
  }
};
globalObject.ObjectStore = new ManaStore("os");
globalObject.SecureStore = new ManaStore("ss");

// mana-stub:mana
var BasicAuthenticationUIIdentifier = { EMAIL: 0, USERNAME: 1 };

// src/index.ts
function emulate(v) {
  let target;
  if (typeof v === "function") {
    target = new v();
  } else {
    target = v;
  }
  target.onEnvironmentLoaded?.().catch((err) => {
    console.error("onEnvironmentLoaded", `${err}`);
  });
  return target;
}

function bit(position) {
  return 1 << position;
}

const Intents = {
  preferenceMenuBuilder: 0,
  requiresSetup: 1,
  coverTransport: 25,
  pageTransport: 26,
  pageLinkResolver: 3,
  libraryPageLinkProvider: 4,
  authenticatable: 5,
  basicAuth: 6,
  basicAuthUsesEmail: 7,
  webviewAuth: 8,
  oauthAuth: 9,
  providesSearch: 10,
  providesSearchForm: 11,
  providesSearchSortOptions: 12,
  chapterEventHandler: 13,
  contentEventHandler: 14,
  librarySyncHandler: 15,
  pageReadHandler: 16,
  progressSyncHandler: 17,
  groupedUpdateFetcher: 18,
  redrawingHandler: 19,
  chaptersInContent: 20,
  providesChapters: 21,
  canHandleURL: 22,
  allowsMultipleInstances: 23,
  requiresAuthenticationToAccessContent: 24
};

function evaluateIntents(target, sourceEnvironment) {
  if (!target) return { flags: 0 };
  let flags = 0;
  let sourceConfig;
  if (target.config) {
    sourceConfig = target.config;
  }
  if (target.getPreferenceMenu) flags |= bit(Intents.preferenceMenuBuilder);
  if (target.getSetupMenu && target.validateSetupForm && target.isRunnerSetup) {
    flags |= bit(Intents.requiresSetup);
  }
  if (typeof target.getCoverTransport === 'function') {
    flags |= bit(Intents.coverTransport);
  }
  if (typeof target.getPageTransport === 'function') {
    flags |= bit(Intents.pageTransport);
  }
  if (target.getSectionsForPage && target.resolvePageSection) {
    flags |= bit(Intents.pageLinkResolver);
  }
  if (target.getLibraryPageLinks) flags |= bit(Intents.libraryPageLinkProvider);
  const sourceAuthenticatable = !!(target.getAuthenticatedUser && target.handleUserSignOut);
  const basicAuthenticatable = !!target.handleBasicAuth;
  const webViewAuthenticatable = !!(target.getWebAuthRequestURL && target.didReceiveSessionCookieFromWebAuthResponse);
  const oAuthAuthenticatable = !!(target.getOAuthRequestURL && target.handleOAuthCallback);
  const authenticatable = basicAuthenticatable || webViewAuthenticatable || oAuthAuthenticatable;
  if (sourceAuthenticatable && authenticatable) {
    flags |= bit(Intents.authenticatable);
    if (basicAuthenticatable) {
      flags |= bit(Intents.basicAuth);
      if (target.BasicAuthenticationUIIdentifier === BasicAuthenticationUIIdentifier.EMAIL) {
        flags |= bit(Intents.basicAuthUsesEmail);
      }
    } else if (webViewAuthenticatable) {
      flags |= bit(Intents.webviewAuth);
    } else if (oAuthAuthenticatable) {
      flags |= bit(Intents.oauthAuth);
    }
  }
  if (target.search) flags |= bit(Intents.providesSearch);
  if (target.getSearchForm) flags |= bit(Intents.providesSearchForm);
  if (target.getSortOptions) {
    flags |= bit(Intents.providesSearchSortOptions);
  }
  if (target.getContent) {
    if (target.onChaptersMarked && target.onChapterRead) {
      flags |= bit(Intents.chapterEventHandler);
    }
    if (target.onContentsAddedToLibrary && target.onContentsRemovedFromLibrary) {
      flags |= bit(Intents.contentEventHandler);
    }
    if (target.syncUserLibrary) flags |= bit(Intents.librarySyncHandler);
    if (target.onPageRead) flags |= bit(Intents.pageReadHandler);
    if (target.getProgressState) flags |= bit(Intents.progressSyncHandler);
    if (target.getGroupedUpdates) flags |= bit(Intents.groupedUpdateFetcher);
    if (target.shouldRedrawImage && target.redrawImageWithSize) {
      flags |= bit(Intents.redrawingHandler);
    }

    let providesChapters = target.getChapterData;
    if (providesChapters) {
      flags |= bit(Intents.providesChapters);
    }
    if (!target.getChapters && providesChapters) {
      flags |= bit(Intents.chaptersInContent);
    }
  }
  if (target.handleURL) flags |= bit(Intents.canHandleURL);
  if (sourceConfig) {
    if (sourceConfig.allowsMultipleInstances) {
      flags |= bit(Intents.allowsMultipleInstances);
    }
    if (sourceConfig.requiresAuthenticationToAccessContent) {
      flags |= bit(Intents.requiresAuthenticationToAccessContent);
    }

  }
  return { flags };
}

function evaluateEnvironment(target) {
  if (!target) return "unknown";

  if (target.getContent 
    && target.search 
    && target.didUpdateLastReadChapter 
    && target.didUpdateStatus 
    && target.getEntryForm 
    && target.didSubmitEntryForm)
    return "tracker";
  
  return "source";
}

var index_default = emulate;
export {
  index_default as default,
  emulate,
  evaluateEnvironment,
  evaluateIntents
};

globalObject.emulate = emulate;
globalObject.evaluateEnvironment = evaluateEnvironment;
globalObject.evaluateIntents = evaluateIntents;
