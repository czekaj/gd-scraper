#!/bin/sh
docker run --name localgdcontainer --network sam-local --publish 1001:80 --rm localgd
