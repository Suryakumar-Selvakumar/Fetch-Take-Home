1.  Evalution Criteria:

        • Code quality – Assess it for each component
        • Use of best practices – Review the components
        • Fulfilment of minimum requirements – Make sure to fulfill all minimum requirements + Optional requirements as well
        • Site usability/UX –
            ◦ Implement Mobile layouts for the whole app
            ◦ Implement ARIA roles
            ◦ Make the app responsive
            ◦ Integrate framer motion animations where possible

2.  What are the Pages/Components I need for this app?

    i) Home –

        • Describes what the app is for
        • Have a button somewhere to take the user to the login screen
        • Make it look pretty

    ii) Login –

        • The user would enter their name and email in a form here
        • Authenticate with the API using this info
        • Maybe create a loading animation while the user waits

    iii) Search –

        • Initially, just display the dogs returned from /dogs endpoint
        • You’ll have filter/sort options that’ll allow the user to sort through the results
        • You’ll also have a Generate Match button, that’ll take the IDs of the dogs that were favorited by the user and return a match.

    iv) Match – (Component)

        • Display the matched dog details either in a seperate page or in a modal of some kind
        • You’ll already have the dog details available in the search page because its one of the favorited dogs
        • Once the /dogs/match endpoint returns the ID of the matched dog, just use that to display the existing details in a modal

3.  Styling Ideas

    i) Let the website be Fetch themed – Refer to their color themes and styles for the project, copy where you can and adapt the rest

    ii) Get inspiration from actual dog adoption sites and see if you can integrate their design choices

4.  Filter Logic

    4.1. Filter by Search

        4.1.1. Main logic

            i) Use a regex to seperate out a city, state vs a zipcode

            ii) If it matches city or state, let the 4.1.2. play out

            iii) If it matches zipcode, let 4.1.3. play out


        4.1.2. City, State

            i) If the user provides city or states as input, do the following.

            ii) Send it to the /locations/search endpoint via a POST request

            iii) This endpoint would return an array of Locations Objects

            iv) These objects contain matching zip codes found for the city/states

            v) You'll use these in the /dogs/search endpoint to get the Dog objects that contain those zip codes, essentially filtering based on zip codes


        4.1.3. Zip Code

            i) If the user provides zip code itself as input, do the following

            ii) You can just add the zipcode to the zipCode array

            iii) Send it to the /dogs/search endpoint as a query parameter

            iv) It should filter based on zip codes and return the appropriate results


        4.1.4. Search Array Processing logic

            i) The user inputs will be added to an array that’s assigned to the search prop inside filters state

            ii) Iterate through this array, if an element is a city/state, i.e., regular text input, use it to send a

    4.2. Filter by Breed, ageMin, ageMax

        4.2.1. Breed:

            i) Create a scrollable select component.

            ii) The breeds will be fetched on page load, stored in a state and supplied to this component as options

            iii) You need to allow multiple options to be selected

            iv) The API fetch will happen right after each option is selected. Maybe disable option selection while results for one option are loading. Check Petfinder to see how they do it.


        4.2.2. ageMin

            i) Setup the slider from ShadCN

            ii) It can either be 0 or 1 initially

            iii) Max possible value is 29 or whatever age is the highest one returned by the API


        4.2.3. ageMax

            i) ShadCN slider

            ii) Initially 29 or the highest possible age returned by the API

            iii) Can go as low as 0 or 1

    4.3. Design

        4.3.1. Top Bar

        Will contain the following:

            i) A search bar with “Enter City, State, or ZIP” where you’ll collect input for 4.1

            ii) A Sort By bar where the user can select how to sort the results
                • breed
                • name
                • age

            iii) A Order By bar where the user select the direction of the sort
                • Ascending
                • Descending

        4.3.2. Left Bar

        Will contain the following

            i) A Breed bar to select multiple breeds – You’ll have to figure out how to setup this logic. Each breed as they are selected must be added to the breeds array

            ii) Sliders: Individual values that can be passed in as they are to the query. You’ll have to figure out how the set the appropriate default values
                • Min Age – 0?
                • Max Age – 20?

5.  API Logic

    5.1. Pagination

        i) Get the pagination component from ShadCN

        ii) Implement from param into getAPIURL function.

        iii) Use it in subsequent requests if the next page or previous page button is clicked

        5.1.1. Pagination bug

            The useCallback to memoize the function has resulted in an interesting bug. setPageDirection initially gets the value "next" from me clicking on the next pagination button and then for the next time, I click the next button, since the pageDirection remains the same as "next", the previously memoized function with the old values is used rather than the new next values resulting in the previous fetched data to be fetched again. You can observe this in the console output. However, I am resetting pageDirection within the same function call so my thought process was that since pageDirection gets set back to "". The next time the next pagination button is pressed, its freshly set back to "next" which will cause a change in the dependency array leading to the function getting called again but it seems that it doesn't work that way. Maybe because the last pageDirection that was registered in the function was "next", not "" so when I set it to "next" again, its as though nothing changed in the function. My solution for this I think should be to set pageDirection to something unique for each next query. Maybe rather than resetting it back to "", I can set it to the previously stored searchResult.next value and upon clicking the next button, pageDirection would be set to the current searchResult.next value cause a change and ensuring it continues from the previous one.

    5.2. Favorites

        i) Create a favourites state that's an array

        ii) Include a favorites checkbox for all dog cards

        iii) Shape the checkbox as a star or as a heart

        iv) If enabled, the id of the dog will be added to the favorites array

        v) If disabled, the id of the dog will be removed from the array

        vi) Once new dogs are fetched, the ones that have already been favorited must be checked again by default. You can achieve this by comparing with the existing ids in the favorites array and enabling the checkbox if any of the new dog IDs already exist in the favorites array.

        vii) Consider localStorage implementation for favorites so that on page load previously favorited dogs will remain favorites

    5.3. Match

        i) Quite straightforward, simply pass in the favorites array to the /dogs/match endpoint

        ii) Send the data via the body of the fetch function

        iii) It will return the id of dog that was matched with the user

        iv) Find a model component online to use

        v) Have that component sit as is or behind a conditional render

        vi) Create a state match

        vi) The state will be populated with the dog data of the dog that was matched with the user. This dog object will already exist in the dogs array state that contains all the dog objects. You just need to use the matched dog's ID to find the same dog from the dogs state.

        vii) Then you can pass this data into the modal component to display it as the matched dog

        viii) You can even use valid data in this state to conditionally render the modal component.

        ix) Create a button "Generate match" that initiates the whole process

        x) Upon retrieval of the successful match, the "Generate match" turns into a show match button

        xi) The show match button can be clicked to view the modal that contains the matched dog again

        xii) The modal will also have a close button that can be used to close it

        xi) If the favorites state changes, then you clear match state and reset the button back to "Generate Match" again to start the process again for the new set of favorites

    5.4. Show total no. of results

        i) Simple, just use the total data from searchResult state

        ii) Display it in the Filterbar

6.  Mobile Layout

    6.1. Filterbar & Sidebar

        i) Have a pen icon visible only in mobile layout

        ii) Use a state to control it

        iii) When pen is clicked, the screen transitions into a menu, the search, the sort and order select drop downs will be present here

        iv) Upon changing any of the filters inside the menu, it closes and updated dog cards show in the screen

        v) Give the search input, and the select bars absolute properties based on isFilterBarVisible

        vi) Define 2 animations, one for opening, another for closing the filterbar. Use fill-mode forwards with the animation.

        vii) You'd need 2 states, one to control when the animation to close the Filterbar page should run and another to stop rendering the page onAnimationEnd

7.  Testing

    7.1. Home

        7.1.1. Logged out

            7.1.1.1. Navbar

                i) Clicking on search asks for login

                ii) Clicking on favorites asks for login

                iii) Clicking on Login takes user to login page

                iv) Clicking on Logo brings user back to the Home page

                v) Clicking on Home brings user back to the Home page

            7.1.1.2. Body

                i) Clicking on the Dog Cards asks for login

        7.1.2. Logged in

            7.1.2.1. Navbar

                i) Search takes user to search page
                    • getSearchUrl does not have to be mocked
                    • mock fetch in getDogIds.ts
                    • mock 2 fetches in getDogsData.ts

                ii) Favorites takes user to favorites page

                iii) Logout logs out the user

            7.1.2.2. HoverCard

                i) Dog cards add their respective breed as a filter in search page

    7.2. Login

        7.2.1. Logged out

            i) Form Login button logs in the user

        7.2.2. Logged in

            i) Browse our catalog of dogs takes user to Search page

            ii) Logout logs out the user

    7.3. Search

        7.3.1. Filterbar

            i) Search Input adds the input as a filter

            ii) Sort By Dropdown changes the sorting criteria

            iii) Order By Dropdown changes the sort order

        7.3.2. Sidebar

            i) Breed dropdown adds selected breed to filters

            ii) Min Age slider applies minimum age to filters

            iii) Max Age slider applies maximum age to filters

        7.3.3. Filters

            i) Filter’s X button removes the filter

            ii) Clear all button clears all the filters

        7.3.4. Cards

            i) Favorites button favorites the card
                • You have to use mock localStorage

            ii) Hovering on location displays the distance in miles

        7.3.5. Pagination

            i) Next takes the user to next page

            ii) Previous takes the user to previous page

            iii) Page 1 takes the user to next page

            iv) Page 0 takes the user to previous page

    7.4. Favorites

        7.4.1. Cards

            i) Favorite button removes the dog from favorites

        7.4.2. Pagination

            i) Next takes the user to next page

            ii) Previous takes the user to previous page

            iii) Page 1 takes the user to next page

            iv) Page 0 takes the user to previous page

        7.4.3. Modal

            i) displays the matched dog details

            ii) Close button closes the modal