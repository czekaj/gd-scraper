#!/bin/sh
PAGE_URL="http://localgdcontainer/index2.html"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "{\n\t\"pageUrl\": \"$PAGE_URL\",\n\t\"Base64Script\": \"`base64 $SCRIPT_DIR/event.js`\"\n}" > $SCRIPT_DIR/event.json
