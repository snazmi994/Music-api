curl --include "http://localhost:4741/music/${ID}"\
--include \
--request GET \
--header "Authorization: Bearer ${TOKEN}"

echo
