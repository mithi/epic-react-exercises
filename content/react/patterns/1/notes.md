## The User Update Exercise

-   This exercise, you'll have a form that updates the user information.
-   The backend will choose an avatar and a tower for the user on the provided information which are her nickname, her self description and what she ate.
-   This information should be available anywhere in your app.
-   The request to update will be rejected if the user writes the word `parler` in any of the fields.
-   When you submit the form, the user profile will be immediately updated, but when the backend reports that something when wrong, the update will be erased, and the user profile will go back to the latest saved information.
-   There should be a `reset`, `submit`, `try again` button when appropriate, and they should be disabled when appropriate.
-   The user should also be notified if she has successfully updated her profile, if there was an error, or if it is in a process updating.

### Bonus

1.  The fields

    -   Username (Disabled)
    -   Nickname
    -   What did you eat today?
    -   Write a short description about yourself

2.  Your answers will determine your big head avatar and tower

    -   How you look is determined by the letters of your nickname.
    -   The accessories (hat, hat color, shirt color, graphic, shirt) depends on what you ate today.
    -   The number of characters in your description determine which tower you will live in.

### Notes

> Helper methods are object junk that we need to recreate and compare for no purpose other than superficially nicer looking syntax. - [Dan Abramov](https://twitter.com/dan_abramov/status/1125758606765383680)

-   Dan Abramov says [this may help improve performance](https://twitter.com/dan_abramov/status/1125774170154065920)
