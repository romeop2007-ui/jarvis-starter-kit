#!/usr/bin/env python3
"""Provide the local Meta Ads MCP token to Codex without embedding it in config."""

import json
import pathlib
import sys


ENV_FILE = pathlib.Path(__file__).resolve().parents[1] / ".env"
TOKEN_KEY = "META_ADS_MCP_TOKEN"


def read_token() -> str | None:
    if not ENV_FILE.exists():
        return None
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        key, separator, value = line.partition("=")
        if separator and key.strip() == TOKEN_KEY:
            value = value.strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            return value or None
    return None


token = read_token()
if token is None:
    print(f"{TOKEN_KEY} is missing from {ENV_FILE}", file=sys.stderr)
    sys.exit(1)

sys.stdout.write(json.dumps({"Authorization": f"Bearer {token}"}))
