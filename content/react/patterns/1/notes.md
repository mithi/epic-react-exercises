## The User Update Exercise

-   This exercise, you'll have a form that updates the user profile.
-   The backend will choose an avatar for the user on the provided information
-   This user profile should be available anywhere in your app
-   The request to update will be rejected 50% of the time to simulate network errors.
-   When the form is submitted, the user profile will be immediately updated, but when the backend reports that something when wrong, the update will be erased, and the user profile will go back to the latest saved information.
-   There should be a `reset`, `submit`, `try again` button when appropriate, and they should be disabled when appropriate.
-   The user should also be notified of the status of her update, (`successful`, `unsucessful`, `pending`)
-   The fields:
    -   User id (disabled)
    -   Nickname
    -   Biography: A short description about yourself
-   The big head avatar is computed this way:
    -   How you look is determined by the letters of your nickname, and previous nickname
    -   The accessories (hat, hat color, shirt color, graphic, shirt) depends on the letters of your bio

### Background

A good pattern to use here is `Context Module Functions`. In a nutshell, the idea have a function that can be exported to be used in conjuction with the `dispatch` function that your hook exposes. This function accepts the `dispatch` function (along with other arguments) and calls this `dispatch` function appropriately.

Here is an example of how this pattern can be applied to a global `Counter` context. You'd have a module `counter-context.js` which exports `CounterProvider`, `useCounter` and `updateCounter`. `useCounter` exposes two properties `[state, dispatch]`. To update the state of the counter, you'd pass the `dispatch` to `updateCounter` along with any other arguments required by the `updateCounter` function.

For this exercise, I'll have a `user-context.js` which exports `UserProvider`, `useUser` and `updateUser`. Where `userUpdate` takes in three arguments:
the `dispatch` function, the current `user` from the `useUser` and `updates`. `updates` are the contents of the submitted form.The `userUpdate` function is responsible for communicating the required updates to our backend and updating the saved `user` depending on the response of the backend. The `user` is updated by calling the `dispatch` function.

### My Solution

TODO

### Notes

> Helper methods are object junk that we need to recreate and compare for no purpose other than superficially nicer looking syntax. - [Dan Abramov](https://twitter.com/dan_abramov/status/1125758606765383680)

-   Dan Abramov says this pattern (context module functions) [may help improve performance](https://twitter.com/dan_abramov/status/1125774170154065920)
