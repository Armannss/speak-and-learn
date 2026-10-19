# Armanly

A small web app for our English speaking class. It turns the vocabulary, phrases and grammar from the class slides into short daily lessons, flashcards and practice.

**Open the app:** https://armannss.github.io/speak-and-learn/

It runs in any modern browser on a phone or a computer. There is nothing to install and no account to create.

## What you can do in it

- **Learn.** 151 expressions in 13 topics, split into 29 short lessons. Each lesson teaches about five expressions (pronunciation, Persian meaning, example sentence) and then checks them with a few questions.
- **Cards.** Swipe flashcards with spaced repetition: words you know come back less often, words you miss come back sooner. Each card shows the word type (noun, adjective, verb phrase…), synonyms and the opposite.
- **Practice.** A mixed Daily 10, fill the blank, collocations, synonyms and opposites, listen and type, grammar drills, and timed speaking drills. Lessons also ask a synonym and an opposite question.
- **Library.** The full word list, 11 groups of conversation phrases, and 7 grammar topics with rules, examples and common mistakes.
- **My words.** Add your own words and phrases. They join your flashcards and practice.
- **Progress.** XP, levels, a daily streak, badges, and a list of the expressions you got wrong so you can review them.
- **Settings.** The button at the top right: American or British pronunciation, sound effects, and light or dark mode.

About 10 to 15 minutes a day is enough: one lesson, ten flashcards, one speaking drill.

## Add it to your home screen

- **iPhone (Safari):** Share, then "Add to Home Screen".
- **Android (Chrome):** menu, then "Add to Home screen" or "Install app".

After the first visit it also works offline.

## Your data

Everything you do (progress, streak, your own words) is saved in your browser on your device. Nothing is sent to a server, and nobody else can see it. Each person who uses the app on their own phone has their own progress.

The app also remembers where you stopped. If you close it in the middle of a lesson, it opens at the same question next time. The X in a lesson pauses it; Home and Practice show it with a Resume button. Your tab, your place in the word list and your flashcard are kept too.

Safari can delete data from websites you have not opened for 7 days. Adding the app to your home screen avoids this.

There is no login. To move your progress to another phone or computer, open the progress panel (tap the streak at the top, or your level on Home) and choose **Send to my other device**. Send the link to yourself (Telegram, WhatsApp, email) and open it on the other device. The progress is inside the link itself and is never stored on a server, so keep the link private. You can also use **Save backup file** and **Restore from file**. Save a backup before clearing your browser data.

Pronunciation uses the voice built into your device, so how it sounds depends on your phone or computer.

## For whoever maintains this

The app is plain HTML, CSS and JavaScript with no build step and no dependencies.

| File | What it is |
| --- | --- |
| `index.html` | The whole app: content, styles and code |
| `sw.js` | Service worker that makes the app work offline |
| `manifest.json` | Name, colours and icons for the home-screen install |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App icons |
| `DESIGN-SYSTEM.md` | Colours, type, components and saved data, for anyone adding screens |

It is hosted with GitHub Pages from the root of the `main` branch.

To update the content after a class, replace `index.html` and `sw.js` with the new versions. When you add an expression to `VOCAB`, also add a line for it to `WORD_INFO` (word type, synonyms, opposite) just below; an expression without one simply shows no synonyms. The cache name at the top of `sw.js` has to change with every update, otherwise phones keep showing the old version.

## Credits

Content comes from the materials of our English speaking class. Built by Arman Naseri Far.
