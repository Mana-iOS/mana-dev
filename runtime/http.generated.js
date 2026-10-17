// GENERATED from @mana-app/types/src/runtime/http. Do not edit.
"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/runtime/http/index.ts
  var http_exports = {};
  __export(http_exports, {
    AbortError: () => AbortError,
    Body: () => Body,
    BodyReader: () => BodyReader,
    BridgeOperation: () => BridgeOperation,
    CloudflareError: () => CloudflareError,
    HttpBodyKind: () => HttpBodyKind,
    HttpClient: () => HttpClient,
    HttpHeaders: () => HttpHeaders,
    HttpMethod: () => HttpMethod,
    HttpResponse: () => HttpResponse,
    HttpStatusError: () => HttpStatusError,
    NetworkError: () => NetworkError,
    OutcomeKind: () => OutcomeKind,
    RateLimit: () => RateLimit,
    RateLimitAction: () => RateLimitAction,
    RequestOrigin: () => RequestOrigin,
    TimeoutError: () => TimeoutError,
    bridge: () => bridge,
    encodeUTF8: () => encodeUTF8,
    imageDispatch: () => imageDispatch,
    positive: () => positive,
    responseExport: () => responseExport
  });

  // src/runtime/http/types.ts
  var RequestOrigin = /* @__PURE__ */ ((RequestOrigin2) => {
    RequestOrigin2[RequestOrigin2["General"] = 0] = "General";
    RequestOrigin2[RequestOrigin2["Cover"] = 1] = "Cover";
    RequestOrigin2[RequestOrigin2["Page"] = 2] = "Page";
    return RequestOrigin2;
  })(RequestOrigin || {});
  var HttpMethod = /* @__PURE__ */ ((HttpMethod2) => {
    HttpMethod2[HttpMethod2["Get"] = 0] = "Get";
    HttpMethod2[HttpMethod2["Head"] = 1] = "Head";
    HttpMethod2[HttpMethod2["Post"] = 2] = "Post";
    HttpMethod2[HttpMethod2["Put"] = 3] = "Put";
    HttpMethod2[HttpMethod2["Patch"] = 4] = "Patch";
    HttpMethod2[HttpMethod2["Delete"] = 5] = "Delete";
    HttpMethod2[HttpMethod2["Options"] = 6] = "Options";
    return HttpMethod2;
  })(HttpMethod || {});
  var HttpBodyKind = /* @__PURE__ */ ((HttpBodyKind2) => {
    HttpBodyKind2[HttpBodyKind2["Json"] = 0] = "Json";
    HttpBodyKind2[HttpBodyKind2["Form"] = 1] = "Form";
    HttpBodyKind2[HttpBodyKind2["Text"] = 2] = "Text";
    HttpBodyKind2[HttpBodyKind2["Bytes"] = 3] = "Bytes";
    return HttpBodyKind2;
  })(HttpBodyKind || {});
  var OutcomeKind = /* @__PURE__ */ ((OutcomeKind2) => {
    OutcomeKind2[OutcomeKind2["Response"] = 0] = "Response";
    OutcomeKind2[OutcomeKind2["Error"] = 1] = "Error";
    return OutcomeKind2;
  })(OutcomeKind || {});
  var RateLimitAction = /* @__PURE__ */ ((RateLimitAction2) => {
    RateLimitAction2[RateLimitAction2["Allow"] = 0] = "Allow";
    RateLimitAction2[RateLimitAction2["Wait"] = 1] = "Wait";
    return RateLimitAction2;
  })(RateLimitAction || {});
  var BridgeOperation = /* @__PURE__ */ ((BridgeOperation2) => {
    BridgeOperation2[BridgeOperation2["Fetch"] = 0] = "Fetch";
    BridgeOperation2[BridgeOperation2["Read"] = 1] = "Read";
    BridgeOperation2[BridgeOperation2["Release"] = 2] = "Release";
    BridgeOperation2[BridgeOperation2["Cancel"] = 3] = "Cancel";
    BridgeOperation2[BridgeOperation2["CreateBody"] = 4] = "CreateBody";
    BridgeOperation2[BridgeOperation2["RetainBody"] = 5] = "RetainBody";
    BridgeOperation2[BridgeOperation2["Invalidate"] = 6] = "Invalidate";
    BridgeOperation2[BridgeOperation2["BeginOperation"] = 7] = "BeginOperation";
    BridgeOperation2[BridgeOperation2["EndOperation"] = 8] = "EndOperation";
    return BridgeOperation2;
  })(BridgeOperation || {});
  var BodyReader = /* @__PURE__ */ ((BodyReader2) => {
    BodyReader2[BodyReader2["Text"] = 0] = "Text";
    BodyReader2[BodyReader2["Base64"] = 1] = "Base64";
    return BodyReader2;
  })(BodyReader || {});
  var imageDispatch = /* @__PURE__ */ Symbol.for("mana.http.image.v1");
  var responseExport = /* @__PURE__ */ Symbol.for("mana.http.response.v1");
  function bridge() {
    const value = globalThis.__manaHTTPBridge;
    if (!value) {
      throw new Error("Mana HTTP host adapter is not installed");
    }
    return value;
  }

  // src/runtime/http/headers.ts
  var reservedNames = /* @__PURE__ */ new Map();
  function validate(name, value) {
    if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name) || /[\r\n]/.test(value)) {
      throw new TypeError("Invalid HTTP header");
    }
  }
  function findKey(headers, name) {
    const normalized = name.toLowerCase();
    const keys = Object.keys(headers);
    for (let index = keys.length - 1; index >= 0; index--) {
      if (keys[index].toLowerCase() === normalized) {
        return keys[index];
      }
    }
  }
  var HttpHeaders = class _HttpHeaders {
    constructor(initial = {}) {
      this.setAll(initial instanceof _HttpHeaders ? initial.toJSON() : initial);
    }
    get(name) {
      const key2 = findKey(this, name);
      return key2 === void 0 || this[key2] === void 0 ? null : String(this[key2]);
    }
    has(name) {
      return this.get(name) !== null;
    }
    set(name, value) {
      const normalized = name.toLowerCase();
      const text = String(value);
      validate(name, text);
      this.delete(name);
      const key2 = reservedNames.get(normalized) ?? normalized;
      Object.defineProperty(this, key2, {
        value: text,
        writable: true,
        enumerable: true,
        configurable: true
      });
      return this;
    }
    setAll(headers) {
      for (const [key2, value] of Object.entries(headers)) {
        this.set(key2, value);
      }
      return this;
    }
    delete(name) {
      const normalized = name.toLowerCase();
      for (const key2 of Object.keys(this)) {
        if (key2.toLowerCase() === normalized) {
          delete this[key2];
        }
      }
      return this;
    }
    entries() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toJSON() {
      return Object.fromEntries(
        Object.entries(this).filter(([, value]) => value !== void 0).map(([name, value]) => {
          const text = String(value);
          validate(name, text);
          return [name.toLowerCase(), text];
        })
      );
    }
  };
  var descriptors = new Map([
    ...Object.entries(Object.getOwnPropertyDescriptors(Object.prototype)),
    ...Object.entries(Object.getOwnPropertyDescriptors(HttpHeaders.prototype))
  ]);
  for (const [name, descriptor] of descriptors) {
    const alias = name.replace(/[a-z]/, (letter) => letter.toUpperCase());
    reservedNames.set(name.toLowerCase(), alias);
    Object.defineProperty(HttpHeaders.prototype, name, {
      configurable: true,
      get: descriptor.get ?? (() => descriptor.value),
      set(value) {
        this.set(name, value);
      }
    });
  }

  // src/runtime/http/body.ts
  function snapshot(value) {
    return value === void 0 ? value : JSON.parse(JSON.stringify(value));
  }
  function copyBody(body) {
    return body?.kind === 3 /* Bytes */ ? Body.bytes(body.value, body.contentType) : snapshot(body);
  }
  var Body = {
    json(value) {
      return {
        kind: 0 /* Json */,
        value: snapshot(value),
        contentType: "application/json"
      };
    },
    form(value) {
      return {
        kind: 1 /* Form */,
        value: snapshot(value),
        contentType: "application/x-www-form-urlencoded"
      };
    },
    text(value, contentType = "text/plain; charset=utf-8") {
      return { kind: 2 /* Text */, value, contentType };
    },
    bytes(value, contentType = "application/octet-stream") {
      return {
        kind: 3 /* Bytes */,
        value: new Uint8Array(value),
        contentType
      };
    }
  };
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function encodeBase64(data) {
    let out = "";
    for (let i = 0; i < data.length; i += 3) {
      const n = data[i] << 16 | (data[i + 1] ?? 0) << 8 | (data[i + 2] ?? 0);
      out += alphabet[n >>> 18 & 63] + alphabet[n >>> 12 & 63] + (i + 1 < data.length ? alphabet[n >>> 6 & 63] : "=") + (i + 2 < data.length ? alphabet[n & 63] : "=");
    }
    return out;
  }
  function decodeBase64(value) {
    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      value
    )) {
      throw new TypeError("Invalid Base64");
    }
    const out = new Uint8Array(
      value.length / 4 * 3 - (value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0)
    );
    let p = 0;
    for (let i = 0; i < value.length; i += 4) {
      const n = alphabet.indexOf(value[i]) << 18 | alphabet.indexOf(value[i + 1]) << 12 | (alphabet.indexOf(value[i + 2]) & 63) << 6 | alphabet.indexOf(value[i + 3]) & 63;
      if (p < out.length) {
        out[p++] = n >>> 16;
      }
      if (p < out.length) {
        out[p++] = n >>> 8;
      }
      if (p < out.length) {
        out[p++] = n;
      }
    }
    return out;
  }
  function queryString(params, form = false) {
    const escape = (value) => {
      const encoded = encodeURIComponent(String(value)).replace(
        /[!'()*]/g,
        (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
      );
      return form ? encoded.replace(/%20/g, "+") : encoded;
    };
    return Object.entries(params).flatMap(
      ([key2, value]) => (Array.isArray(value) ? value : [value]).map(
        (item) => `${escape(key2)}=${escape(item)}`
      )
    ).join("&");
  }
  function wireBody(body) {
    if (!body) {
      return void 0;
    }
    switch (body.kind) {
      case 0 /* Json */:
        return JSON.stringify(body.value);
      case 1 /* Form */:
        return queryString(body.value, true);
      case 2 /* Text */:
        return String(body.value);
      case 3 /* Bytes */:
        return encodeBase64(body.value);
      default:
        throw new TypeError("Unknown HTTP body kind");
    }
  }

  // src/runtime/http/errors.ts
  var NetworkError = class extends Error {
    constructor(message, request, cause) {
      super(message);
      this.request = request;
      this.cause = cause;
      this.name = "NetworkError";
    }
  };
  var TimeoutError = class extends NetworkError {
    constructor(request) {
      super("HTTP request deadline exceeded", request);
      this.name = "TimeoutError";
    }
  };
  var AbortError = class extends NetworkError {
    constructor(request) {
      super("HTTP request cancelled", request);
      this.name = "AbortError";
    }
  };
  var HttpStatusError = class extends Error {
    constructor(response) {
      super(`HTTP ${response.status}`);
      this.response = response;
      this.name = "HttpStatusError";
    }
  };
  var CloudflareError = class extends Error {
    constructor(resolutionURL) {
      super("The requested resource is Cloudflare protected");
      this.resolutionURL = resolutionURL;
      this.name = "CloudflareError";
    }
  };

  // src/runtime/http/limiter.ts
  function positive(value, label) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${label} must be positive and finite`);
    }
    return value;
  }
  var RateLimit = {
    spaced({
      requests,
      intervalMs
    }) {
      const spacing = positive(intervalMs, "intervalMs") / positive(requests, "requests");
      let next = -Infinity;
      return {
        tryAcquire(context) {
          if (context.nowMs < next) {
            return {
              action: 1 /* Wait */,
              retryAfterMs: next - context.nowMs
            };
          }
          next = context.nowMs + spacing;
          return { action: 0 /* Allow */ };
        }
      };
    },
    tokenBucket({
      capacity,
      refillTokens,
      intervalMs
    }) {
      positive(capacity, "capacity");
      if (capacity < 1) {
        throw new RangeError("capacity must be at least one");
      }
      const rate = positive(refillTokens, "refillTokens") / positive(intervalMs, "intervalMs");
      let tokens = capacity;
      let last;
      return {
        tryAcquire(context) {
          if (last !== void 0) {
            tokens = Math.min(
              capacity,
              tokens + Math.max(0, context.nowMs - last) * rate
            );
          }
          last = context.nowMs;
          if (tokens < 1) {
            return {
              action: 1 /* Wait */,
              retryAfterMs: (1 - tokens) / rate
            };
          }
          tokens--;
          return { action: 0 /* Allow */ };
        }
      };
    }
  };

  // src/runtime/http/encoding.ts
  function encodeUTF8(value) {
    return Buffer.from(value, "utf8");
  }
  function decodeUTF8(bytes) {
    const text = Buffer.from(
      bytes.buffer,
      bytes.byteOffset,
      bytes.byteLength
    ).toString("utf8");
    return text.charCodeAt(0) === 65279 ? text.slice(1) : text;
  }

  // src/runtime/http/operation-context.ts
  var key = /* @__PURE__ */ Symbol.for("mana.http.operations.v1");
  function currentHttpOperation() {
    return globalThis[key]?.current;
  }

  // src/runtime/http/response.ts
  var Finalizer = globalThis.FinalizationRegistry;
  var finalizer = Finalizer ? new Finalizer(
    ({ native, host }) => {
      void host.send({ operation: 2 /* Release */, bodyID: native.bodyID }).catch(() => {
      });
    }
  ) : void 0;
  var BodyStorage = class {
    constructor(native, local, operation = currentHttpOperation()) {
      this.native = native;
      this.local = local;
      this.operation = operation;
      this.reads = /* @__PURE__ */ new Map();
      this.released = false;
      this.expired = false;
      operation?.own(this);
      if (native) {
        finalizer?.register(this, { native, host: bridge() }, this);
      }
    }
    check() {
      if (this.expired || this.operation?.closed) {
        throw new Error(
          "Response body is unavailable after the source operation finishes"
        );
      }
    }
    expire() {
      this.expired = true;
      finalizer?.unregister(this);
      this.reads.clear();
      this.native = void 0;
      this.local = void 0;
    }
    release() {
      if (this.released || !this.native) {
        return;
      }
      this.released = true;
      finalizer?.unregister(this);
      void bridge().send({ operation: 2 /* Release */, bodyID: this.native.bodyID }).catch(() => {
      });
    }
    detach() {
      this.check();
      if (this.released || !this.native) {
        throw new Error("Native response body is unavailable");
      }
      this.released = true;
      this.operation?.exportBody(this.native.bodyID);
      finalizer?.unregister(this);
      return this.native;
    }
    read(reader) {
      this.check();
      let result = this.reads.get(reader);
      if (!result) {
        if (this.released && !this.local) {
          return Promise.reject(
            new Error("Response body is no longer owned by JavaScript")
          );
        }
        if (reader === 0 /* Text */ && this.native?.text !== void 0) {
          result = Promise.resolve(this.native.text);
        } else if (this.local) {
          result = Promise.resolve(
            reader === 1 /* Base64 */ ? encodeBase64(this.local) : decodeUTF8(this.local)
          );
        } else {
          result = bridge().send({
            operation: 1 /* Read */,
            bodyID: this.native.bodyID,
            reader
          }).then((v) => v.value);
        }
        this.reads.set(reader, result);
        result.catch(() => this.reads.delete(reader));
      }
      return result;
    }
  };
  var HttpResponse = class _HttpResponse {
    constructor(request, native, local, operation) {
      this.request = request;
      this.status = native.status;
      this.url = native.url;
      this.headers = new HttpHeaders(native.headers);
      this.storage = new BodyStorage(
        local ? void 0 : native,
        local,
        operation
      );
    }
    get ok() {
      return this.status >= 200 && this.status < 300;
    }
    text() {
      return __async(this, null, function* () {
        const value = yield this.storage.read(0 /* Text */);
        return value.charCodeAt(0) === 65279 ? value.slice(1) : value;
      });
    }
    json() {
      return __async(this, null, function* () {
        return JSON.parse(yield this.text());
      });
    }
    bytes() {
      return __async(this, null, function* () {
        this.storage.check();
        return this.storage.local ? new Uint8Array(this.storage.local) : decodeBase64(yield this.base64());
      });
    }
    arrayBuffer() {
      return __async(this, null, function* () {
        return (yield this.bytes()).buffer;
      });
    }
    base64() {
      return __async(this, null, function* () {
        return this.storage.read(1 /* Base64 */);
      });
    }
    requireOk() {
      if (!this.ok) {
        throw new HttpStatusError(this);
      }
      return this;
    }
    withBody(body, options) {
      this.storage.check();
      const bytes = typeof body === "string" ? encodeUTF8(body) : new Uint8Array(body);
      const headers = new HttpHeaders(this.headers).delete("content-encoding").set("content-length", String(bytes.length));
      if (options?.contentType) {
        headers.set("content-type", options.contentType);
      }
      return new _HttpResponse(
        this.request,
        {
          status: this.status,
          url: this.url,
          headers: headers.toJSON(),
          bodyID: "",
          sessionID: ""
        },
        bytes,
        this.storage.operation
      );
    }
    /** @internal Releases a body that was not transferred to a native consumer. */
    releaseNative() {
      this.storage.release();
    }
    /** @internal Transfers the final body to a native consumer. */
    [responseExport]() {
      return __async(this, null, function* () {
        this.storage.check();
        const metadata = {
          status: this.status,
          url: this.url,
          headers: this.headers.toJSON()
        };
        if (this.storage.native) {
          const native = this.storage.detach();
          return {
            ...metadata,
            bodyID: native.bodyID,
            sessionID: native.sessionID
          };
        }
        const created = yield bridge().send({
          operation: 4 /* CreateBody */,
          value: yield this.base64(),
          operationID: this.storage.operation?.id
        });
        this.storage.operation?.exportBody(created.bodyID);
        return { ...metadata, ...created };
      });
    }
  };

  // src/runtime/http/cancellation.ts
  var Cancellation = class {
    constructor(request, timeout, signal, cancel, runtimeSignal, operationSignal) {
      this.request = request;
      this.signal = signal;
      this.cancel = cancel;
      this.runtimeSignal = runtimeSignal;
      this.operationSignal = operationSignal;
      this.onAbort = () => this.stop(new AbortError(this.request));
      this.stopped = new Promise((_, reject) => {
        this.reject = reject;
      });
      void this.stopped.catch(() => {
      });
      this.timer = setTimeout(
        () => this.stop(new TimeoutError(request)),
        timeout
      );
      signal?.addEventListener("abort", this.onAbort, { once: true });
      runtimeSignal?.addEventListener("abort", this.onAbort, { once: true });
      operationSignal?.addEventListener("abort", this.onAbort, { once: true });
      if (signal?.aborted || runtimeSignal?.aborted || operationSignal?.aborted) {
        this.onAbort();
      }
    }
    stop(error) {
      if (this.error) {
        return;
      }
      this.error = error;
      this.cancel?.();
      this.reject(error);
    }
    check() {
      if (this.error) {
        throw this.error;
      }
    }
    race(work) {
      return __async(this, null, function* () {
        this.check();
        return Promise.race([work, this.stopped]);
      });
    }
    wait(ms) {
      return __async(this, null, function* () {
        let timer;
        try {
          yield this.race(
            new Promise((resolve) => {
              timer = setTimeout(resolve, Math.ceil(ms));
            })
          );
        } finally {
          if (timer !== void 0) {
            clearTimeout(timer);
          }
        }
      });
    }
    close() {
      clearTimeout(this.timer);
      this.signal?.removeEventListener("abort", this.onAbort);
      this.runtimeSignal?.removeEventListener("abort", this.onAbort);
      this.operationSignal?.removeEventListener("abort", this.onAbort);
    }
  };

  // src/runtime/http/request.ts
  function validateMethod(method) {
    if (!Number.isInteger(method) || method < 0 /* Get */ || method > 6 /* Options */) {
      throw new TypeError("Invalid HTTP method");
    }
  }
  function resolveURL(base, url, params) {
    if (!/^https?:\/\//i.test(url)) {
      if (!base) {
        throw new TypeError("Relative HTTP URL requires setBaseURL");
      }
      const origin = /^(https?:\/\/[^/]+)/i.exec(base)[1];
      if (url.startsWith("//")) {
        url = origin.split(":")[0] + ":" + url;
      } else if (url.startsWith("/")) {
        url = origin + url;
      } else {
        url = base.replace(/\/$/, "") + "/" + url;
      }
    }
    if (!/^https?:\/\/[^/?#]+(?:[/?#]|$)/i.test(url)) {
      throw new TypeError("Invalid HTTP URL");
    }
    const hash = url.indexOf("#");
    if (hash >= 0) {
      url = url.slice(0, hash);
    }
    const query = params && queryString(params);
    return query ? url + (url.includes("?") ? "&" : "?") + query : url;
  }

  // src/runtime/http/execution.ts
  var sequenceKey = /* @__PURE__ */ Symbol.for("mana.http.sequence");
  function validateRetryPolicy(value) {
    const maxRetries = typeof value === "number" ? value : value.maxRetries;
    if (!Number.isSafeInteger(maxRetries) || maxRetries < 0) {
      throw new RangeError("maxRetries must be a non-negative integer");
    }
    return typeof value === "number" ? value : { ...value };
  }
  function executeRequest(input, options, origin, configuration) {
    try {
      return new RequestExecution(input, options, origin, configuration).run();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  var RequestExecution = class {
    constructor(input, options, origin, configuration) {
      this.origin = origin;
      this.host = bridge();
      this.operation = currentHttpOperation();
      this.imageBodies = /* @__PURE__ */ new Set();
      this.operation?.check();
      if (this.host.requiresOperation && !this.operation) {
        throw new Error(
          "HTTP request has no source operation. Repackage the source with the updated Mana toolchain."
        );
      }
      if (this.host.metadataOnly) {
        throw new Error(
          "Network access is unavailable during source metadata evaluation"
        );
      }
      const timeoutMs = positive(
        options.timeoutMs ?? configuration.timeoutMs,
        "timeoutMs"
      );
      this.policy = validateRetryPolicy(options.retry ?? configuration.retry);
      this.initial = {
        url: resolveURL(configuration.baseURL, input.url, options.params),
        method: input.method ?? 0 /* Get */,
        headers: new HttpHeaders(configuration.headers).setAll(
          options.headers ?? {}
        )
      };
      validateMethod(this.initial.method);
      if (input.body) {
        this.initial.body = copyBody(input.body);
      }
      this.limiter = configuration.limiter;
      this.requestInterceptors = [...configuration.requestInterceptors];
      this.responseInterceptors = [...configuration.responseInterceptors];
      this.metadata = Object.freeze(snapshot(options.metadata ?? {}));
      const root = globalThis;
      root[sequenceKey] = (root[sequenceKey] ?? 0) + 1;
      this.requestId = `${Date.now()}-${root[sequenceKey]}`;
      this.deadline = this.host.now() + timeoutMs;
      this.cancellation = new Cancellation(
        this.initial,
        timeoutMs,
        options.signal,
        () => this.cancelTransfer(),
        this.host.signal,
        this.operation?.controller.signal
      );
    }
    run() {
      return __async(this, null, function* () {
        try {
          if (this.operation) {
            yield this.cancellation.race(this.operation.open(this.host));
          }
          for (let attempt = 1; ; attempt++) {
            const context = Object.freeze({
              requestId: this.requestId,
              origin: this.origin,
              attempt,
              metadata: this.metadata
            });
            const request = yield this.prepareRequest(context);
            const body = wireBody(request.body);
            const granted = this.limiter ? yield this.acquire(request, context) : void 0;
            const result = yield this.performAttempt(
              request,
              body,
              context,
              granted
            );
            this.cancellation.check();
            if (result.failure instanceof AbortError || result.failure instanceof TimeoutError) {
              throw result.failure;
            }
            yield this.checkChallenge(request, result.response);
            if (this.shouldRetry(request, context, result)) {
              result.response?.releaseNative();
              yield this.cancellation.wait(
                this.retryDelay(result.response, attempt)
              );
              continue;
            }
            if (result.failure) {
              throw result.failure;
            }
            this.finalResponse = yield this.interceptResponse(
              result.response,
              context
            );
            return this.finalResponse;
          }
        } finally {
          this.cancellation.close();
          for (const response of this.imageBodies) {
            if (response !== this.finalResponse) {
              response.releaseNative();
            }
          }
        }
      });
    }
    prepareRequest(context) {
      return __async(this, null, function* () {
        let request = {
          ...this.initial,
          headers: new HttpHeaders(this.initial.headers),
          body: copyBody(this.initial.body)
        };
        for (const interceptor of this.requestInterceptors) {
          request = yield this.cancellation.race(
            Promise.resolve().then(() => interceptor(request, context))
          );
          if (!request || !(request.headers instanceof HttpHeaders)) {
            throw new TypeError("Interceptor must return an HttpRequest");
          }
        }
        request.url = resolveURL(void 0, request.url);
        validateMethod(request.method);
        if (request.body?.contentType && !request.headers.has("content-type")) {
          request.headers.set("content-type", request.body.contentType);
        }
        return request;
      });
    }
    acquire(request, context) {
      return __async(this, null, function* () {
        while (true) {
          this.cancellation.check();
          const admission = { ...context, request, nowMs: this.host.now() };
          const decision = this.limiter.tryAcquire(admission);
          if (decision.action === 0 /* Allow */) {
            return admission;
          }
          if (decision.action !== 1 /* Wait */) {
            throw new TypeError("Invalid limiter decision");
          }
          yield this.cancellation.wait(
            positive(decision.retryAfterMs, "retryAfterMs")
          );
        }
      });
    }
    performAttempt(request, body, context, granted) {
      return __async(this, null, function* () {
        const result = {};
        this.activeID = this.requestId + "-" + context.attempt;
        try {
          const native = yield this.fetchResponse(request, body);
          result.response = new HttpResponse(
            request,
            native,
            void 0,
            this.operation
          );
          this.trackImageBody(result.response);
        } catch (error) {
          result.failure = transportError(error, request);
        } finally {
          this.activeID = void 0;
          if (granted) {
            this.limiter.onComplete?.(granted, attemptOutcome(result));
          }
        }
        return result;
      });
    }
    fetchResponse(request, body) {
      return __async(this, null, function* () {
        this.cancellation.check();
        const remaining = this.deadline - this.host.now();
        if (remaining <= 0) {
          throw new TimeoutError(request);
        }
        const pending = this.host.send({
          operation: 0 /* Fetch */,
          requestID: this.activeID,
          url: request.url,
          method: request.method,
          headers: request.headers.toJSON(),
          bodyKind: request.body?.kind,
          body,
          timeoutMs: remaining,
          origin: this.origin,
          operationID: this.operation?.id
        });
        try {
          return yield this.cancellation.race(pending);
        } catch (error) {
          const host = this.host;
          void pending.then(
            (native) => host.send({
              operation: 2 /* Release */,
              bodyID: native.bodyID
            }),
            () => {
            }
          ).catch(() => {
          });
          throw error;
        }
      });
    }
    cancelTransfer() {
      if (!this.activeID) {
        return;
      }
      void this.host.send({
        operation: 3 /* Cancel */,
        requestID: this.activeID,
        operationID: this.operation?.id
      }).catch(() => {
      });
    }
    checkChallenge(request, response) {
      return __async(this, null, function* () {
        if (!response) {
          return;
        }
        let challenge = response.headers.get("cf-mitigated") === "challenge";
        const server = (response.headers.get("server") ?? "").toLowerCase();
        if (!challenge && [403, 503].includes(response.status) && server.includes("cloudflare")) {
          const text = (yield this.cancellation.race(response.text())).slice(0, 8192).toLowerCase();
          challenge = [
            "cf-chl",
            "cf-turnstile",
            "cdn-cgi/challenge-platform",
            "challenges.cloudflare.com"
          ].some((marker) => text.includes(marker));
        }
        if (challenge) {
          response.releaseNative();
          throw new CloudflareError(request.url);
        }
      });
    }
    shouldRetry(request, context, result) {
      const maxRetries = typeof this.policy === "number" ? this.policy : this.policy.maxRetries;
      if (context.attempt > maxRetries) {
        return false;
      }
      const outcome = attemptOutcome(result);
      if (typeof this.policy !== "number" && this.policy.shouldRetry) {
        return this.policy.shouldRetry({
          request,
          context,
          outcome,
          retriesUsed: context.attempt - 1
        });
      }
      const transient = result.failure ? !(result.failure instanceof AbortError || result.failure instanceof TimeoutError) : [429, 502, 503, 504].includes(result.response.status);
      return (request.method === 0 /* Get */ || request.method === 1 /* Head */) && transient;
    }
    retryDelay(response, attempt) {
      const header = response?.headers.get("retry-after");
      const seconds = header == null ? NaN : Number(header);
      if (Number.isFinite(seconds) && seconds >= 0) {
        return seconds * 1e3;
      }
      const date = header ? Date.parse(header) : NaN;
      return Number.isFinite(date) ? Math.max(0, date - Date.now()) : Math.min(5e3, 250 * 2 ** (attempt - 1));
    }
    interceptResponse(response, context) {
      return __async(this, null, function* () {
        for (const interceptor of this.responseInterceptors) {
          response = yield this.cancellation.race(
            Promise.resolve().then(() => interceptor(response, context))
          );
          if (!(response instanceof HttpResponse)) {
            throw new TypeError("Interceptor must return an HttpResponse");
          }
          this.trackImageBody(response);
        }
        return response;
      });
    }
    trackImageBody(response) {
      if (this.origin !== 0 /* General */) {
        this.imageBodies.add(response);
      }
    }
  };
  function attemptOutcome(result) {
    if (result.response) {
      return {
        kind: 0 /* Response */,
        status: result.response.status,
        headers: result.response.headers
      };
    }
    return { kind: 1 /* Error */, error: result.failure };
  }
  function transportError(error, request) {
    if (error instanceof NetworkError) {
      return error;
    }
    const failure = error;
    if (failure?.name === "TimeoutError") {
      return new TimeoutError(request);
    }
    if (failure?.name === "AbortError") {
      return new AbortError(request);
    }
    return new NetworkError(String(failure?.message ?? error), request, error);
  }

  // src/runtime/http/client.ts
  var HttpClient = class {
    constructor() {
      this.timeoutMs = 3e4;
      this.retry = 0;
      this.headers = new HttpHeaders();
      this.requests = [];
      this.responses = [];
    }
    setBaseURL(url) {
      if (/[?#]/.test(url)) {
        throw new TypeError("Base URL must not contain query or fragment");
      }
      this.baseURL = resolveURL(void 0, url);
      return this;
    }
    setTimeoutMs(value) {
      this.timeoutMs = positive(value, "timeoutMs");
      return this;
    }
    addHeader(name, value) {
      this.headers.set(name, value);
      return this;
    }
    addHeaders(value) {
      this.headers.setAll(value);
      return this;
    }
    removeHeader(name) {
      this.headers.delete(name);
      return this;
    }
    setRetry(value) {
      this.retry = validateRetryPolicy(value);
      return this;
    }
    setRateLimit(requests, intervalMs) {
      return this.setRateLimiter(RateLimit.spaced({ requests, intervalMs }));
    }
    setRateLimiter(value) {
      if (typeof value?.tryAcquire !== "function") {
        throw new TypeError("Invalid rate limiter");
      }
      this.limiter = value;
      return this;
    }
    addRequestInterceptor(value) {
      if (typeof value !== "function") {
        throw new TypeError("Invalid interceptor");
      }
      this.requests.push(value);
      return this;
    }
    removeRequestInterceptor(value) {
      this.requests = this.requests.filter(
        (interceptor) => interceptor !== value
      );
      return this;
    }
    addResponseInterceptor(value) {
      if (typeof value !== "function") {
        throw new TypeError("Invalid interceptor");
      }
      this.responses.push(value);
      return this;
    }
    removeResponseInterceptor(value) {
      this.responses = this.responses.filter(
        (interceptor) => interceptor !== value
      );
      return this;
    }
    get(url, options) {
      return this.request({ url, method: 0 /* Get */ }, options);
    }
    head(url, options) {
      return this.request({ url, method: 1 /* Head */ }, options);
    }
    delete(url, options) {
      return this.request({ url, method: 5 /* Delete */ }, options);
    }
    post(url, body, options) {
      return this.request({ url, method: 2 /* Post */, body }, options);
    }
    put(url, body, options) {
      return this.request({ url, method: 3 /* Put */, body }, options);
    }
    patch(url, body, options) {
      return this.request({ url, method: 4 /* Patch */, body }, options);
    }
    request(input, options = {}) {
      return this.execute(input, options, 0 /* General */);
    }
    /** @internal Cross-bundle dispatch keeps the host independent of package instances. */
    [imageDispatch](request, signal) {
      return this.execute(
        { url: request.url, method: 0 /* Get */ },
        { signal },
        request.origin
      );
    }
    execute(input, options, origin) {
      return executeRequest(input, options, origin, {
        baseURL: this.baseURL,
        timeoutMs: this.timeoutMs,
        retry: this.retry,
        headers: this.headers,
        limiter: this.limiter,
        requestInterceptors: this.requests,
        responseInterceptors: this.responses
      });
    }
  };

  // src/runtime/http/abort.ts
  function installAbortController() {
    const host = globalThis;
    if (host.AbortController) {
      return;
    }
    class Signal {
      constructor() {
        this.aborted = false;
        this.onabort = null;
        this.listeners = /* @__PURE__ */ new Set();
      }
      addEventListener(type, listener) {
        if (type === "abort" && listener) {
          this.listeners.add(listener);
        }
      }
      removeEventListener(type, listener) {
        if (type === "abort") {
          this.listeners.delete(listener);
        }
      }
      throwIfAborted() {
        if (this.aborted) {
          throw this.reason;
        }
      }
      abort(reason) {
        if (this.aborted) {
          return;
        }
        this.aborted = true;
        this.reason = reason;
        const event = { type: "abort", target: this };
        for (const listener of this.listeners) {
          try {
            listener(event);
          } catch (error) {
            setTimeout(() => {
              throw error;
            }, 0);
          }
        }
        this.listeners.clear();
        this.onabort?.(event);
      }
      static abort(reason) {
        const value = new Signal();
        value.abort(reason ?? new Error("Aborted"));
        return value;
      }
      static timeout(ms) {
        const value = new Signal();
        setTimeout(() => value.abort(new Error("Timeout")), ms);
        return value;
      }
    }
    host.AbortSignal = Signal;
    host.AbortController = class {
      constructor() {
        this.signal = new Signal();
      }
      abort(reason) {
        this.signal.abort(reason ?? new Error("Aborted"));
      }
    };
  }

  // http-emulator.ts
  globalThis.ManaHTTP = http_exports;
  installAbortController();
})();
