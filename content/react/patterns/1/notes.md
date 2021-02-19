## The User Update Exercise

-   This exercise, you'll have a form that updates the user profile.
-   The backend will choose an avatar for the user on the provided information
-   This user profile should be available anywhere in your app
-   The request to update will be rejected 50% of the time to simulate network errors.
-   When the form is submitted, the user profile will be immediately updated, but when the backend reports that something when wrong, the update will be erased, and the user profile will go back to the latest saved information.
-   There should be a `reset`, `submit`, `try again` button when appropriate, and they should be disabled when appropriate.
-   The user should also be notified of the status of her update, (`successful`, `unsucessful`, `pending`)

### Basically...

1.  The fields

    -   Username (Disabled)
    -   Nickname
    -   Write a short description about yourself

2.  The big head avatar is computed given

    -   How you look is determined by the letters of your nickname
    -   The accessories (hat, hat color, shirt color, graphic, shirt) depends on the number of characters in your description and your previous nickname ??

### Notes

> Helper methods are object junk that we need to recreate and compare for no purpose other than superficially nicer looking syntax. - [Dan Abramov](https://twitter.com/dan_abramov/status/1125758606765383680)

-   Dan Abramov says [this may help improve performance](https://twitter.com/dan_abramov/status/1125774170154065920)
