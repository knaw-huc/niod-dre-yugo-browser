#!/bin/bash

cd procrustus-indexer

uv sync
uv lock
source .venv/bin/activate

#python read_and_index.py -h
#exit

echo "INSTITUTION"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1721373443934/records/ -t /app/configs/institution.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
echo "COLLECTION"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1747312582429/records/ -t /app/configs/collection.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
echo "PERSON"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1721373443955/records/ -t /app/configs/person.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
echo "GROUP"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1747312582450/records/ -t /app/configs/group.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
echo "EVENT"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1733830015132/records/ -t /app/configs/event.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
echo "PLACE"
python read_and_index.py -d /data/apps/yugo/profiles/clarin.eu:cr1:p_1744616237113/records/ -t /app/configs/place.toml --force
if [ $? -ne 0 ]
then
    exit 1
fi
