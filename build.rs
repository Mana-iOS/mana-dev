fn main() {
    println!("cargo:rerun-if-changed=runtime/http.generated.js");
    println!("cargo:rerun-if-changed=runtime/emulator.js");
    println!("cargo:rerun-if-changed=runtime/target_processor.js");

    #[cfg(target_os = "windows")]
    {
        // Link Windows libraries required by V8
        println!("cargo:rustc-link-lib=advapi32");
        println!("cargo:rustc-link-lib=tdh");  // Event Tracing for Windows
        println!("cargo:rustc-link-lib=winmm");
        println!("cargo:rustc-link-lib=dbghelp");
    }
}
