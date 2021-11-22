WORD=$1
TMPFILE1=/tmp/dictapi1
TMPFILE2=/tmp/dictapi2
curl https://dictionaryapi.com/api/v3/references/learners/json/$WORD?key=5033c274-82c5-4c9c-a514-c1ee4d63440a > $TMPFILE1 2> /dev/null
curl https://dictionaryapi.com/api/v3/references/spanish/json/$WORD?key=a1995c5a-38ba-411d-be86-9d182bbf7e38 > $TMPFILE2 2> /dev/null
jq -r '.[0].meta."app-shortdef".def[0]' $TMPFILE1
jq -r '.[0].hwi.prs[0].ipa' $TMPFILE1
jq -r '.[0].def[0].sseq[0][0][1].dt[0][1]' $TMPFILE2
jq -r '.[1].def[0].sseq[0][0][1].dt[0][1]' $TMPFILE2
jq '.[]' /tmp/dictapi1 | grep '"t":'
