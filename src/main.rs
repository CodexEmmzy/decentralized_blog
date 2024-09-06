// Conditionally compile the program without a main function unless the "export-abi" feature is enabled.
// This is typically used for smart contracts where the standard entry point is not required.

#![cfg_attr(not(feature = "export-abi"), no_main)]


// If the "export-abi" feature is enabled, this function acts as the entry point.
// It prints the ABI for the smart contract using the stylus_hello_world::print_abi function.
// The ABI is accompanied by the license type ("MIT-OR-APACHE-2.0") and the Solidity compiler version ("pragma solidity ^0.8.23;").

#[cfg(feature = "export-abi")]
fn main() {
    stylus_hello_world::print_abi("MIT-OR-APACHE-2.0", "pragma solidity ^0.8.23;");
}
