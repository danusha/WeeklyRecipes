## **Epics & User Stories: Weekly Meal Plan**

After writing requirements I used Claude to help me write out the user stories as an accelerant. 

### **Epic 1: Application Shell & Navigation**

Foundational layout and shell that every other feature plugs into.  
**E1S1 \- Collapsible sidebar navigation**  
 As a user, I want a sidebar I can collapse so I can maximize screen space for recipe content.

* Sidebar is visible by default on desktop  
* Toggle control collapses/expands the sidebar  
* Sidebar contains links to: Home, Weekly Plan, Shopping List, Favorites  
* Active page is visually indicated

**E1S2 \- Page Navigation**  
 As a user, I want each nav link to take me to its corresponding page so I can move through the app.

* Each of the four nav links routes to its respective page  
* Direct URL navigation works for all four routes  
* Browser back/forward buttons behave correctly

### **Epic 2: Onboarding Quiz**

Onboarding experience for first time users that captures preferences used for all future recipe filtering.  
**E2S1 \- First-visit detection**  
 As a first-time visitor, I want the quiz to launch automatically so I'm not staring at an empty app.

* On first visit, the Home page shows the onboarding quiz instead of recipe cards  
* Once completed, the quiz does not appear on subsequent visits  
* Quiz state/completion is persisted and saved as settings locally

**E2S2 \- Multi-step wizard navigation**  
 As a user, I want to move forward and backward through the quiz so I can review and correct my answers.

* Next button advances to the next field  
* Back button returns to the previous field  
* Back button is disabled/hidden on the first step  
* Progress indicator shows current step out of total  
* Selected answers persist when navigating back and forth

**E2S3 \- Name and birthday capture**  
 As a user, I want to enter my name and birthday so the app can personalize my experience.

* Name accepts free text  
* Birthday uses a date picker  
* Both fields validate before allowing Next

**E2S4 \- Diet selection step**  
 As a user, I want to select a special diet so recipes match what I eat.

* Options: Mediterranean, Paleo, Vegetarian, Low Sodium, Low GI, Keto, Whole30, None  
* Each option is a checkbox styled as a button with a matching icon  
* Multiple selections allowed   
* None deselects all other options

**E2S5 \- Allergies step with custom entry**  
 As a user, I want to flag my allergies including ones not on the default list so recipes are safe for me.

* Default options: Nuts, Shellfish, Pork, Soy, None (button-styled checkboxes with icons)  
* "Add another ingredient" control lets the user type and add a custom allergen  
* Custom allergens appear alongside defaults and can be removed  
* Multiple selections allowed  
* None deselects all other options

**E2S6 \- Ingredient avoidance step with custom entry**  
 As a user, I want to mark ingredients I prefer to avoid (separate from allergies) so I don't get recipes I dislike.

* Default options: Shellfish, Pork, Beef, Chicken, Fish, Mushrooms (button-styled checkboxes with icons)  
* "Add another ingredient" control lets the user type and add custom items  
* Custom items can be removed  
* Multiple selections allowed

**E2S7-  Meal inclusion step**  
 As a user, I want to choose which meals to plan so I'm not getting recipes for meals I skip.

* Options: Breakfast, Lunch, Dinner, Snacks  
* At least one selection required to finish the quiz

**E2S8 \- Save quiz results as settings**  
 As a user, I want my quiz answers saved so they drive my recipe suggestions going forward.

* On quiz completion, answers are persisted as user settings  
* Settings are retrievable for filtering Spoonacular calls  
* Settings can be edited later from settings page

### **Epic 3: Spoonacular Integration & Recipe Service**

Backend/service layer that fetches and filters recipes. Most other epics depend on this.  
**E3S1 \- Spoonacular API client**  
 As a developer, I want a wrapped Spoonacular client so calls are consistent and easy to mock in tests.

* Client handles auth, base URL, and error handling  
* API key stored in environment configuration, not in source  
* Rate limit / quota errors surface gracefully to the UI

**E3S2 \- Filtered recipe fetch**  
 As a developer, I want to fetch recipes filtered by the user's quiz settings so results respect diet, allergies, and avoidances.

* Function accepts user settings and a meal category  
* Maps diet selections to Spoonacular's diet parameter  
* Maps allergies to Spoonacular's intolerances parameter  
* Excludes any avoided ingredients  
* Returns only recipes matching the requested meal category (breakfast/lunch/dinner/snack)

**E3S3 \- Random recipe selection**  
 As a developer, I want randomized selection from the filtered pool so users see variety across rerolls.

* Selection avoids returning the same recipe twice in the same week where possible  
* Handles empty result sets gracefully (e.g., user's filters return nothing)

### **Epic 4: Recipe Card Component**

The reusable card used on Home and Weekly Plan.  
**E4S1 \- Recipe card summary view**  
 As a user, I want each card to show the meal photo and name so I can tell at a glance what's planned.

* Card displays recipe image and name  
* Card is color-coded by meal category using the chosen 4-color palette (one color each for breakfast/lunch/dinner/snack \- design to confirm palette)  
* Layout works in single-column (Home) and grid (Weekly Plan) contexts

**E4S2 \- Reroll a single recipe**  
 As a user, I want to reroll a card I don't like so I can get a different recipe in the same category.

* Reroll control on each card  
* New recipe respects all user settings and stays in the same meal category  
* Visual feedback during fetch (loading state)

**E4S3 \- Favorite a recipe**  
 As a user, I want to favorite a recipe so I can find it again later.

* Favorite toggle on each card with clear active/inactive states  
* Favorited state persists across sessions  
* Favorited recipes appear on the Favorites page (see Epic 7\)

**E4S4 \- Supplemental info link**  
 As a user, I want a link to videos or other supplemental info when available so I can learn more about the dish.

* If Spoonacular returns a video/supplemental link, the card surfaces it  
* Hidden gracefully when no link exists

**E4S5 \- Recipe detail modal**  
 As a user, I want to click a card to see full ingredients and steps so I can actually cook the meal.

* Clicking the card opens a modal  
* Modal shows full ingredient list and step-by-step instructions  
* Modal can be closed via X, Esc, or backdrop click  
* Favorite and reroll actions are accessible from the modal (confirm with design)

### **Epic 5: Home Page**

**E5S1 \- Greeting**  
 As a returning user, I want a hello statement so the app feels personal.

* Displays greeting using the name from the quiz  
* (Optional: time-of-day variation — confirm with design)

**E5S2 \- Today's recipes**  
 As a returning user, I want today's recipes on the front page so I can act on them without extra clicks.

* Displays one recipe card per included meal category for today  
* Only shows categories the user opted into during the quiz  
* Each card supports all behaviors from Epic 4

**E5S3 \- Link to full week**  
 As a user, I want a link to the full week below today's cards so I can look ahead easily.

* Visible link/button directly under the cards  
* Navigates to Weekly Plan page

### **Epic 6: Weekly Plan Page**

**E6S1 \- Week grid view**  
 As a user, I want to see the full week laid out so I can see what's coming.

* One row per day of the week  
* Each row contains up to 4 recipe cards (breakfast, lunch, dinner, snack), respecting the meals the user opted into  
* Cards use the shared Recipe Card component

**E6S2 \- Reroll the entire week**  
 As a user, I want to reroll the whole week in one action so I can start fresh fast.

* Single control rerolls every card on the page  
* Loading state covers all cards during fetch  
* Favorited recipes also reroll

**E6S3 \- Reroll a single day**  
 As a user, I want to reroll just one day so I can refresh a day without losing the rest.

* Each day row has a reroll control  
* Only that day's cards are replaced

### **Epic 7: Favorites Page**

**E7S1 \- Favorites list**  
 As a user, I want to see all my favorited recipes in one place so I can revisit them.

* Lists all recipes the user has favorited  
* Each entry uses the Recipe Card component  
* Empty state when no favorites exist

**E7S2 \- Unfavorite from list**  
 As a user, I want to remove a favorite so my list stays useful.

* Removing a favorite keeps the recipe card in the list until the user navigates away. 

### **Epic 8: Shopping List Page**

**E8S1 \- Aggregated ingredient list**  
 As a user, I want one consolidated ingredient list for the week so I can shop in one trip.

* Page lists every ingredient across the current week's recipes  
* Duplicate ingredients are combined with summed quantities where possible  
* Grouped by category (produce, dairy, etc.) — confirm with design

**E8S2 \- Check off items**  
 As a user, I want to check items off as I shop so I can track progress.

* Each item has a checkbox  
* State persists during the shopping session and resets with recipe reset

