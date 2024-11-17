# ns-demo

## API test automation task notes

Postman collection: https://web.postman.co/workspace/9104111d-7cc7-4315-9d0e-cdc46868f199

Security concern #1:
Access token is leaking unencrypted credentials, e.g. password and signature_key are available.

Security concern #2:
Access token is missing expiration details. Potentially it might stay valid indefinitely.

Security concern #3:
User items include unencrypted passwords, e.g. encoded value "YouWereH4ck3d" found in "fields" property of the user item request/response.

Security concern #5:
Response headers leak implementation details that could be used as an attack vector: response headers include "Server: Jetty(11.0.14)".

Security concern #6:
Potential leak of item ids: fetching user items by id may return "Access Forbidden". Preferably, "Not Found" should be returned for both forbidden access or item not found.

Security concern #7:
Login endpoint might be vulnerable to brute force attacks or maliciously blocking user access: API documentation implies that the request rate is limited by hourly rate per user session.
