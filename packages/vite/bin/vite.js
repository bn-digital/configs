#!/usr/bin/env node
const path = require("path")
const { execSync } = require("child_process")

execSync(`yarn vite ${process.argv}`, { stdio: "inherit" })
