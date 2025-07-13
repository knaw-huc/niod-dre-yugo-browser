#!/bin/bash

cd procrustus-indexer

uv sync
uv lock
source .venv/bin/activate

echo "INSTITUTION"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1721373443934/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/institution.toml --force
echo "COLLECTION"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1747312582429/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/collection.toml --force
echo "PERSON"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1721373443955/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/person.toml --force
echo "GROUP"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1747312582450/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/group.toml --force
echo "EVENT"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1733830015132/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/event.toml --force
echo "PLACE"
python read_and_index.py -d /Users/menzowi/Documents/GitHub/niod-dre-yugo-editor/data/apps/yugo/profiles/clarin.eu:cr1:p_1744616237113/records/ -t /Users/menzowi/Documents/GitHub/niod-dre-yugo-browser/indexer/configs/place.toml --force