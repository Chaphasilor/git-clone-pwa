# "git clone" for a PWA

This is a quick and dirty proof-of-concept to show how you can use the new [File System Access API](https://web.dev/file-system-access/) to implement a `git clone`-like feature for a modern Web App.

**To test it out**:

1. Download the files inside this directory (or clone the whole repo)
2. Run `npx serve` inside the `git-clone-pwa`-folder. This starts a web server on `localhost:5000`
3. Open `localhost:5000` in an up-to-date browser that supports the File System Access API ()
4. Click on "Choose Root Directory" and in the dialog, choose the directory in which you want to clone the other project folder into. Afterwards, allow read access to the folder.
   (If you choose folder `foo`, the cloned files will be in `foo/<name of the project to clone>`)
5. Now paste the contents of the file `pwa-clone-test.json` into the text area, then click on "Clone Directory!".  
6. A sample project directory containing multiple sub-directories and copies of `test-file` will be created inside the root directory you chose in step 4. Awesome!

In theory, you could already use this tool to clone any project. You'd need to create some JSON that describes the project's directory structure (in the same format as `pwa-clone-test.json`) and make sure the URLs of each file are `CORS`-enabled (else the browser won't be able to fetch the files).  
You might also encounter problems with large directories, because the JSON file simply becomes too large to handle.

I might write a small script that parses an existing directory into the required format; if you're interested, let me know!
