# Sequence diagram

User
 |
 |---[1] Click "Upload to GDrive"----------> FE (Vue App)
 |
 |---[2] FE checks for GDrive auth---------> BE
 |                                          |
 |<--[3] BE returns auth URL if needed-----/
 |
 |---[4] FE redirects user to GDrive OAuth---> GDrive
 |                                              |
 |<--[5] GDrive returns auth code/token--------/
 |
 |---[6] FE sends auth token to BE-----------> BE
 |
 |---[7] User selects file to upload--------> FE
 |
 |---[8] FE sends file & metadata-----------> BE
 |                                          |
 |---[9] BE uploads to GDrive--------------> GDrive
 |                                          |
 |<--[10] GDrive responds with file ID/URL--/
 |<--[11] BE confirms upload to FE----------/
 |
 |---[12] FE shows success to user-----------> User

## Open questions:
For Document Upload:
- How Document will be uploaded: from local file system,
- Drive will be specific for each logged in user
- will the file be stored in a fixed location for the provider
- does the uploaded file need to be downloaded later
For Biometric:
-This will a POC and will focus on fingerprint scanner to begin with