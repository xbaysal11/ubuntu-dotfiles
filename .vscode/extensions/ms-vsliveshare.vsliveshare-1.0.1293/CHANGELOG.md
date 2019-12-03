# Release Notes

## v1.0.826 (September 16th, 2019)

* _Enabling Reusable Sessions for GA_ - Our new functionality of Reusable Sessions is now public with this release. This functionality allows users to create a reusable link from the command palette (Ctrl+Shift+P > Live Share: Create reusable link). Users can use these links to access the same session for repeated use.

## v1.0.765 (September 3rd, 2019)

* _Uninterrupted Workflow in VS Code_ - This release we bring to you the ability to share untitled files without any interruptions during a Live Share session in VS Code.

* _Fixed welcome page bug_ -Some of our new Live Share users were unable to see the welcome page after downloading the extension. This has been fixed in this release.

## v1.0.752 (August 28th, 2019)

* _Adding Reusable Sessions functionality (Insiders)_ - We have added a new functionality that allows users to create a reusable link from the command palette (Ctrl+Shift+P > Live Share: Create reusable link). Users can use these links to access the same session for repeated use.

* _Fixed the file-matching filter in text search_ - We fixed a bug that was causing problems with global conversions on the VS Code hosts side for the text search service. This showed up when some users tried searching for a certain file type during a Live Share session, with a VS Code host, and experience erroneous filtering. 

## v1.0.694 (August 13th, 2019)

* _Extensiblity join fix_ - We fixed a regression in the Extensiblity API that was used by extensions to start a Live Share session using the join flow.

* _Fixed URI encoding in invitation link from contacts pane_ - We fixed an encoding bug we had in the invitation link sent via email to contacts from the contacts pane when sharing a Live Share session.

* _Fixed share/join session state on cancellation_ - We resolved a bug that users were experiencing where even after cancelling out of a share or join, they were unable to share or join a new session.

## v1.0.581 (July 24th, 2019)

* _Conflict error fix when saving a document_ - We resolved a bug in VSCode where an error message may show up on the guest when host saves a document in collaboration session.

* _Presence invitations fix_ - We resolved a bug that caused VSCode to incorrectly display the join input box as opposed to directly joining into collaboration session when inviting someone via presence.

* _More strict security for collaboration session_ - We improved security for guests joining collaboration session to ensure the host user info matches the signed in user who hosts the session.

* _Shared terminal fix for Insiders VSCode_ - We adopted the new terminal APIs in VSCode insiders.

* _Sign in fixes_ - We resolved several issues about users signing in.

## v1.0.123 (April 30th, 2019)

* _Read-only session fixes_ - We resolved some additional bugs related to read-only sessions.

* _Automatically focusing the Live Share view_ - In order to increase the discoverability of the Live Share view, we now automatically focus it when you share or join a session for the first time.

## v1.0.91 (April 24th, 2019)

* _Read-only guest/session fixes_ - We resolved a handful of bugs related to both read-only sessions and read-only guests (participants that didn't login), which ensures that files show up correctly, and can't be edited.

* _Fixing audio 502 failures_ ([#2015](https://github.com/MicrosoftDocs/live-share/issues/2015)) - Some users were experiencing issues trying to start [audio calls](https://aka.ms/vsls-audio), but that has now been addressed.

## v1.0 (April 2nd, 2019)
This is the **version 1.0 release of Visual Studio Live Share**! We've spent the last couple releases working on stability and reliability of the product, and we're really proud to bring Live Share out of preview to you! As always, we really appreciate all of the usage/feedback, so please keep letting us know how to improve!

For more detailed information about previous releases, [visit our GitHub](http://aka.ms/vsls-releases). To get started with using Live Share, visit our [VS Code Quickstart](https://aka.ms/vsls-docs/vscode)!

## v0.3.1403 (March 27th, 2019)

* _Follow loop fix_ [#389](https://github.com/MicrosoftDocs/live-share/issues/389) - This fixes the issue if both participants are following each other, causing the editor windows to jump around.

## v0.3.1156 (March 20th, 2019)

* _Fix for empty workspace bug_ - We've made a fix for an issues that with VS Code hanging when you share an empty workspace.

## v0.3.1151 (March 13th, 2019)

* _Fixed a hang with read-only guest signing in_ - This fixes an issue with Visual Studio hanging for users that initially joined as a Guest User and tried to sign in and join afterwards.

* _Enable Webpack_ - Now the VS Code extensions bundles all the the necessary dependencies. This should result in faster installation and startup times.

## v0.3.1121 (March 6th, 2019)

* _Language service bug fixes_ - We've fixed a couple language service issues that arise during a Live Share session, such as adding an extra period when a guest selects an item in the completion list is VS Code (https://github.com/MicrosoftDocs/live-share/issues/1485), and navigating to an empty file when using Go-To on an external file in Visual Studio.

## v0.3.1071 (February 27th, 2019)

### Bug fixes
1. _Live Share Settings_ - Last release, we introduced a bunch of new features to Live Share. This release, we worked on giving users more fine-grain control on availability of certain features. Now you can:
   - [Control the sharing of external files](https://github.com/MicrosoftDocs/live-share/issues/54) by setting the `liveshare.shareExternalFiles` or `Share External Files` to `true`
   - [Set whether to allow read-only guests](https://github.com/MicrosoftDocs/live-share/issues/3) into a session with the `liveshare.anonymousGuestApproval` or "Anonymous Guest Approval` setting. 
   - [Set whether auto-shared servers](https://github.com/MicrosoftDocs/live-share/issues/113) are automatically opened in browser by setting the `liveshare.openSharedServers` or `Open Shared Servers` to `true. 

### Feature Enhancements
1. Feedback viewlet - We made it easier to find and submit feedback to us! In the Live Share activity bar tab, there is how "Help" viewlet. From here, you can report a problem to us via Twitter or GitHub, as well as open a getting started guide for Live Share with the "More info"
   
   ![Feedback viewlet](https://user-images.githubusercontent.com/4979659/49979728-224a1580-ff05-11e8-8110-7922398bab01.png)

## v0.3.1011

This is a massive release that addresses some of our top feature requests. We really appreciate all of the usage/feedback, so please keep letting us know how to improve!

<a id="features-all"></a>
### Feature Enhancements (VS Code / Visual Studio)

1. [*Shared source control state + diffs*](https://github.com/MicrosoftDocs/live-share/issues/36) 🚀- During a collaboration session, guests will now be able to see the list of files with uncommitted changes, and view their diffs against `HEAD`. This is a critical piece of context for orienting yourself with a project, and in Visual Studio Code, also provides guests with shared access to another core activity tab: `Source Control`. Visual Studio support for shared source control state is provided by the new ([Pull Requests for Visual Studio extension](https://aka.ms/pr4vs)), which currently requires Visual Studio 2019 Preview.

   ![Shared source control diffs](https://user-images.githubusercontent.com/4979659/49205369-ac21ac80-f363-11e8-8d08-a2fb2e27271a.gif)

2. [*PR-like code comments*](https://github.com/MicrosoftDocs/live-share/issues/69) 🔥- While in a collaboration session, participants can now add comments directly to lines of code, as if the session were a lightweight, real-time pull request. This experience enables Live Share to be used for "pre-PRs"/informal code reviews, where guests can leave comments/todos for the host to address later or offline. Additionally, for long-running sessions (many of our users do multi-hour Live Shares!), you can use comments as bookmarks or reminders of things to address later, to help focus the collaboration, and enable checkpoints after working independently for periods of time. 

   ![Code comments](https://user-images.githubusercontent.com/4979659/49205709-af696800-f364-11e8-9e40-9a9affbfffbe.gif)

3. [*Anonymous/read-only guests*](https://github.com/MicrosoftDocs/live-share/issues/3) - Guests can join a session as read-only without signing in. When a user tries to join a session, they select the option to "Continue as read-only guest", and enter their name to be identifiable in the session. This is a lightweight way for guests to join into a collaboration session without needing to sign in with a GitHub or Microsoft account, while still being able to see and navigate the code. 

![Read-only Guest](https://user-images.githubusercontent.com/4979659/49208001-6bc62c80-f36b-11e8-868a-0b7e3efa5ed3.gif)

4. [*Sharing "external files"*](https://github.com/MicrosoftDocs/live-share/issues/54) - When in a collaboration session, if the host opens an external file outside of the shared project, that file is automatically shared with the guests. This is useful if the host wants to show a relevant file to guests that might not be included in the folder/project that is shared (e.g. log or test result files).

5. [*Read-only elevation*](https://github.com/MicrosoftDocs/live-share/issues/903) - In a read-only session, the host has the ability to grant guests read/write access to the code. Guests will then be able to make edits to files. This is useful in cases where a host has multiple guests in a session and wants to keep most of these users as read-only, but grant individual users read/write access (e.g. an interactive lecture where the teacher has students as read-only, but giving a specific  student access to the code to demonstrate or write something in the code). 

![elevate](https://user-images.githubusercontent.com/4979659/49320941-6d056f80-f4b9-11e8-8e06-128f4ca7b9f3.gif)

6. [*Silencing verbose notifications*](https://github.com/MicrosoftDocs/live-share/issues/1069) - We added the ability to control the showing of verbose notifications in a session such as notifying when a guest joins or leaves. By setting `liveshare.showVerboseNotifications` _(VS Code)_ or `Show Verbose Notifications` to `true` will prevent any of such notifications from showing. 

### Feature Enhancements

1. [*Contacts*](https://github.com/MicrosoftDocs/live-share/issues/442) - Live Share now supports the ability to more quickly start a live share session with the contacts you're likely to collaborate with, all from within VS Code. Setting `liveshare.features` to `Experimental`, there is now a "Contacts" viewlet in the Live Share tab that provides a list of contacts to start a session with. There are two different suggestion providers currently available: 
   - A Git-based provider, that shows the people you're most likely to collaborate with on the currently open project.
   - A list of contacts that you’ve recently collaborated with (by either joining or sharing with them).
  
   ![Contacts Viewlet](https://user-images.githubusercontent.com/4979659/49333444-ce8a1480-f573-11e8-8d01-7dbfe392e922.png)
   With these suggested and recent contacts, you have the ability to send an invite via email.

2. *Presence Providers* - To augment the contacts list, we’re working on presence information that allow you to see if a user is online and directly invite them into a session. With the [Team Chat extension](https://marketplace.visualstudio.com/items?itemName=karigari.chat), we support showing presence of contacts for Slack and Discord.

3. [*Automatically sharing web servers*](https://github.com/MicrosoftDocs/live-share/issues/113) - Live Share now supports the ability to detect and automatically share servers that your app is using. This does so by looking at output in the Terminal, and detecting if localhost URLs are utilized. To enable the automatic sharing of servers, set `liveshare.autoShareServers` to `true`.

![Auto Share Server](https://user-images.githubusercontent.com/4979659/49344651-2fc2ee00-f62f-11e8-9cf1-497fbca7f522.gif)

4. [*Sharing a server by URL*](https://github.com/MicrosoftDocs/live-share/issues/893) 🔥 -  As a host, if you want to share a port that is only available via `https`, or a specific path from a port (e.g. `http://localhost:3000/foo/bar`), you can now paste in the URL for the port you want to share, and that will be shared properly to your guest so they can quickly copy the link or directly open the full URL in their browser. 

![Share server by URL](https://user-images.githubusercontent.com/4979659/49311461-10dd2400-f496-11e8-93e6-f655380c2d98.gif)

5. [*Git co-author attribution*](https://github.com/MicrosoftDocs/live-share/issues/558) - Hosts can now add Live Share guests as co-authors in their commit messages. By enabling the `liveshare.populateGitCoAuthors`, the Source Control tab in VS Code will automatically generate the "Co-authored by" trailer in the commit message, so hosts can attribute the collaborators they worked with during a pair programming session. 

6. [*Text chat*](https://github.com/MicrosoftDocs/live-share/issues/69) - The [Team Chat extension](https://marketplace.visualstudio.com/items?itemName=karigari.chat) now provides a lightweight way to chat with participants in a Live Share session without needing to have a Slack or Discord backend. After starting a live share session, you can click the `Chat` button in the status bar to start a conversation with participants in the session. You can also access this chat via the Live Share viewlet, and selecting "Chat channel". Additionally, you can use the extension to connect to your existing Slack or Discord accounts to share a Live Share session with your contacts. 

![Team Chat](https://user-images.githubusercontent.com/4979659/49338148-e644b580-f5d2-11e8-81da-34c1362177f2.gif)

7. *Audio in viewlet* - If the user has the [Live Share Audio Extension](http://aka.ms/vsls-audio) installed, an additional node will be added to the Live Share viewlet for "Audio Call". As a participant, users will have the ability to start an audio call (if one has not already been started). Additionally, users will be able to see participants that are currently in an audio call, and have controls for muting themselves. 

![audio](https://user-images.githubusercontent.com/4979659/49326456-348c8280-f507-11e8-8fed-de516040e569.png)

8. *Merge conflicts* - If a merge conflict is detected when you are trying to push your code, we now show a code lens to start a Live Share session. This will enable you to collaborate with your teammates to solve merge conflicts and more quickly push your code to the repo. 

![Merge Conflict Code Lens for Live Share](https://user-images.githubusercontent.com/4979659/49332979-a4ccef80-f56b-11e8-8540-f2f1f6c0744b.png)

8. *Deep-link install* - When a user opens a join link for a session without already having Live Share, clicking the install link for VS Code on the landing page will launch VS Code, install Live Share, and join the user in the session they were initially linked. This makes it easier for first-time Live Share guests who have not set up their tools to join into their first Live Share session. 

### Community Integrations

The Visual Studio Live Share team is working hard to make collaborative development great out-of-the-box (e.g. sharing edits, debugging, terminals, workspace tasks, [voice calls](https://aka.ms/vsls-audio), etc.) However, we're just one member in the large and prolific Visual Studio Code community, and therefore, to provide a truly amazing collaboration experience for developers, we're excited to be partnering with key products/extensions in order to expand the context/capabilities available in a Live Share session.

1. *GitLens* [#36](https://github.com/MicrosoftDocs/live-share/issues/36)/[#39](https://github.com/MicrosoftDocs/live-share/issues/39) - Guests now have read-only access to [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) functionalities when they join a session (provided both the host and guest has GitLens installed). Guests can visualize code authorship with Git blame annotations, navigate through line/file/repo history, and view diffs between arbitrary baselines (e.g commits, branches, or tags).

2. *Live Server* - If the host has a [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) already running when they start a Live Share session, it will detect the Live Server and prompt the host if they want to share the server. By allowing that, guests will have access to the Live Server.

![Live Server and Live Share](https://user-images.githubusercontent.com/8239356/48166156-8fcaac80-e29c-11e8-9aec-2ac849f3f9ba.png)

## v0.3.868

This is a bug fix release that addresses some user-reported issues. We really appreciate all of the usage/feedback, so please keep letting us know how to improve!

### Bug Fixes (VS Code)

1. [*Show GitHub username instead of e-mail*](https://github.com/MicrosoftDocs/live-share/issues/369) - When collaborating with users that authenticated via GitHub, you'll now see their username instead of e-mail (in join toasts, when hovering over their name in the explorer view).  

2. [*Simplifying the guest joined notification*](https://github.com/MicrosoftDocs/live-share/issues/1104) - We removed the `Reject and block` button from the notification the host sees when a guest joins their session. In practice, some users were accidentally clicking this, thinking it would dismiss the toast. Now that we've added the ability to remove a guest from the Live Share activity bar view, we no longer needed the button in the join toast. 

3. [*Multi-root workspace improvements*](https://github.com/MicrosoftDocs/live-share/issues/1131) - If you share a workspace that includes a non-local root (e.g. opened using the [Remote Workspace extension](https://marketplace.visualstudio.com/items?itemName=mkloubert.vscode-remote-workspace)), or a root that's no longer available (e.g. a directory that was deleted), the workspace will now share correctly, but the unsupported roots will show up as unavailable to the guest. Previously, the share operation would fail entirely in these cases, and we wanted to unblock sharing the valid roots. 

4. *Undo fixes* - There were cases where an undo could leave an extra character in your file. This has now been resolved, which makes co-editing more reliable.