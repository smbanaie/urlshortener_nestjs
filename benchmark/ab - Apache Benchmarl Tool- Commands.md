## Redirect rate test 
```bash
 .\ab.exe -n 1000 -c 30 http://localhost:3000/r/7tQrzH
```




 ## Link Crreation 
```bash
.\ab.exe -n 1000 -c 30 -H  "Authorization: Bearer eyJh  ....  IGLqlRac"   -T application/json -p 'J:\yektanet\shortener\benchmark\link_create.json' -g 'J:\yektanet\shortener\benchmark\link_creation.txt' -e 'J:\yektanet\shortener\benchmark\link_creation.csv'  http://localhost:3000/api/v1/shorten/link 
```

***(Get Bearer Code from login endpoint in swagger Ui)***