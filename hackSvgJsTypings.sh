#!/usr/bin/env bash
sed -i 's#transform(t: Transform#transform(t: MatrixAlias#g' node_modules/svg.js/svg.js.d.ts