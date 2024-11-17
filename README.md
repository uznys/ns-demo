# ns-demo

## UI test automation task notes

### UI test automation cadidates

TBD

### Potential bugs

- Coupon in https://nordpass.com/coupon/ seems to be invalid.
- studentbeans.com integration seems to fail in: https://nordpass.com/deal/student-discount/. Errors in response: "Couldn't find OfferPage" and "401 Unauthorized".
- Could all emails be locked out using https://nordpass.com/try-premium/? z@z.com was already taken. I locked out d@z.com and e@z.com. I have not progressed with registration.
- In https://nordpass.com/password-sharer/ when a viewed password is deleted, it shows a generic error: "3063: Item is not available. It has been viewed, expired or link is incorrect". Why is this an error?
- Test environment is not excluded from robots.txt. I found this in Google: https://nordpass.com/playground-temporary/martyna-playground/
- In https://nordpass.com/affiliate/ "Become an affiliate" link query parameters are missing unlike the "Join now".

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
