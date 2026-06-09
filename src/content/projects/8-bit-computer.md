---
title: "8-Bit Breadboard Computer Assembler"
description: "Custom assembler that compiles assembly source code into binary ROM images for a homebrew 8-bit breadboard computer."
date: 2025-06-01
tags: ["python", "assembly", "low-level", "hardware"]
github: "DylanCoon99/assembler"
featured: true
---

An assembler for a custom 8-bit breadboard computer. Takes assembly source code and produces binary ROM images that can be flashed to AT28C256 EEPROMs using a TL866II+ programmer.

The assembler pipeline runs in three stages: a lexer tokenizes the source text, a parser validates token order and builds a linked list of instructions, and the assembler encodes them into two binary ROM files — one for opcodes and one for operands — matching the dual-EEPROM architecture of the hardware.

## Instruction Set

The computer supports 16 instructions including load/store operations, arithmetic (ADD, SUB), conditional and unconditional jumps, and I/O output. Operands can be specified in decimal, hex, or binary.

## Links

- [GitHub](https://github.com/DylanCoon99/assembler)
