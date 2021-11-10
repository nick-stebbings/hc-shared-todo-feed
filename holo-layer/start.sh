#!/bin/bash
export RUSTUP_TOOLCHAIN=stable
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
hc app pack workdir/happ
hc dna pack workdir/dna
hc s clean
hc s create

agentKey=$(hc s call new-agent)
echo $agentKey
