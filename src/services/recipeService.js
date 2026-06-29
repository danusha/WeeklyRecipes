// Mock recipe data — replace with Spoonacular API calls when key is available

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const MOCK_RECIPES = {
  breakfast: [
    {
      id: 'b1',
      title: 'Avocado Toast with Poached Eggs',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
      readyInMinutes: 15,
      servings: 2,
      mealCategory: 'breakfast',
      extendedIngredients: [
        { name: 'sourdough bread', amount: 2, unit: 'slices' },
        { name: 'avocado', amount: 1, unit: '' },
        { name: 'eggs', amount: 2, unit: '' },
        { name: 'lemon juice', amount: 1, unit: 'tbsp' },
        { name: 'red pepper flakes', amount: 0.5, unit: 'tsp' },
        { name: 'salt', amount: 0.5, unit: 'tsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Toast the sourdough bread until golden and crisp.' },
        { number: 2, step: 'Mash the avocado with lemon juice, salt, and red pepper flakes.' },
        { number: 3, step: 'Bring a pot of water to a gentle simmer. Add a splash of vinegar.' },
        { number: 4, step: 'Crack each egg into a small cup, then gently slide into the water. Cook for 3 minutes.' },
        { number: 5, step: 'Spread avocado on toast and top with the poached eggs.' },
      ]}],
    },
    {
      id: 'b2',
      title: 'Greek Yogurt Parfait',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      readyInMinutes: 5,
      servings: 1,
      mealCategory: 'breakfast',
      extendedIngredients: [
        { name: 'Greek yogurt', amount: 1, unit: 'cup' },
        { name: 'granola', amount: 0.5, unit: 'cup' },
        { name: 'mixed berries', amount: 0.5, unit: 'cup' },
        { name: 'honey', amount: 1, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Spoon yogurt into a glass or bowl.' },
        { number: 2, step: 'Layer with granola and berries.' },
        { number: 3, step: 'Drizzle with honey and serve immediately.' },
      ]}],
    },
    {
      id: 'b3',
      title: 'Banana Oat Pancakes',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop',
      readyInMinutes: 20,
      servings: 2,
      mealCategory: 'breakfast',
      extendedIngredients: [
        { name: 'ripe bananas', amount: 2, unit: '' },
        { name: 'rolled oats', amount: 1, unit: 'cup' },
        { name: 'eggs', amount: 2, unit: '' },
        { name: 'baking powder', amount: 1, unit: 'tsp' },
        { name: 'vanilla extract', amount: 1, unit: 'tsp' },
        { name: 'maple syrup', amount: 2, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Blend oats until fine flour forms.' },
        { number: 2, step: 'Mash bananas and mix with eggs, oat flour, baking powder, and vanilla.' },
        { number: 3, step: 'Cook on a lightly oiled skillet over medium heat, 2 minutes per side.' },
        { number: 4, step: 'Serve with maple syrup.' },
      ]}],
    },
    {
      id: 'b4',
      title: 'Veggie Egg Scramble',
      image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop',
      readyInMinutes: 12,
      servings: 2,
      mealCategory: 'breakfast',
      extendedIngredients: [
        { name: 'eggs', amount: 4, unit: '' },
        { name: 'bell pepper', amount: 1, unit: '' },
        { name: 'spinach', amount: 1, unit: 'cup' },
        { name: 'cherry tomatoes', amount: 0.5, unit: 'cup' },
        { name: 'feta cheese', amount: 2, unit: 'tbsp' },
        { name: 'olive oil', amount: 1, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Heat olive oil in a pan over medium heat.' },
        { number: 2, step: 'Sauté bell pepper and tomatoes for 3 minutes.' },
        { number: 3, step: 'Add spinach and wilt.' },
        { number: 4, step: 'Beat eggs and pour in. Scramble gently until just set.' },
        { number: 5, step: 'Top with feta and serve.' },
      ]}],
    },
    {
      id: 'b5',
      title: 'Overnight Chia Oats',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      readyInMinutes: 5,
      servings: 1,
      mealCategory: 'breakfast',
      extendedIngredients: [
        { name: 'rolled oats', amount: 0.5, unit: 'cup' },
        { name: 'chia seeds', amount: 1, unit: 'tbsp' },
        { name: 'almond milk', amount: 0.75, unit: 'cup' },
        { name: 'honey', amount: 1, unit: 'tsp' },
        { name: 'vanilla extract', amount: 0.5, unit: 'tsp' },
        { name: 'fresh fruit', amount: 0.5, unit: 'cup' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Combine oats, chia seeds, almond milk, honey, and vanilla in a jar.' },
        { number: 2, step: 'Stir well, cover, and refrigerate overnight.' },
        { number: 3, step: 'Top with fresh fruit before serving.' },
      ]}],
    },
  ],
  lunch: [
    {
      id: 'l1',
      title: 'Mediterranean Quinoa Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      readyInMinutes: 25,
      servings: 2,
      mealCategory: 'lunch',
      extendedIngredients: [
        { name: 'quinoa', amount: 1, unit: 'cup' },
        { name: 'cucumber', amount: 1, unit: '' },
        { name: 'cherry tomatoes', amount: 1, unit: 'cup' },
        { name: 'kalamata olives', amount: 0.25, unit: 'cup' },
        { name: 'feta cheese', amount: 0.5, unit: 'cup' },
        { name: 'olive oil', amount: 2, unit: 'tbsp' },
        { name: 'lemon', amount: 1, unit: '' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Cook quinoa according to package instructions. Let cool.' },
        { number: 2, step: 'Dice cucumber and halve cherry tomatoes.' },
        { number: 3, step: 'Combine quinoa, vegetables, olives, and feta.' },
        { number: 4, step: 'Dress with olive oil, lemon juice, salt, and pepper.' },
      ]}],
    },
    {
      id: 'l2',
      title: 'Turkey & Avocado Wrap',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      readyInMinutes: 10,
      servings: 1,
      mealCategory: 'lunch',
      extendedIngredients: [
        { name: 'whole wheat tortilla', amount: 1, unit: '' },
        { name: 'turkey breast', amount: 3, unit: 'oz' },
        { name: 'avocado', amount: 0.5, unit: '' },
        { name: 'romaine lettuce', amount: 2, unit: 'leaves' },
        { name: 'tomato', amount: 0.5, unit: '' },
        { name: 'Dijon mustard', amount: 1, unit: 'tsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Spread mustard on the tortilla.' },
        { number: 2, step: 'Layer turkey, sliced avocado, lettuce, and tomato.' },
        { number: 3, step: 'Roll tightly and slice in half.' },
      ]}],
    },
    {
      id: 'l3',
      title: 'Lentil Soup',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
      readyInMinutes: 40,
      servings: 4,
      mealCategory: 'lunch',
      extendedIngredients: [
        { name: 'red lentils', amount: 1, unit: 'cup' },
        { name: 'carrots', amount: 2, unit: '' },
        { name: 'celery', amount: 2, unit: 'stalks' },
        { name: 'onion', amount: 1, unit: '' },
        { name: 'garlic', amount: 3, unit: 'cloves' },
        { name: 'cumin', amount: 1, unit: 'tsp' },
        { name: 'vegetable broth', amount: 4, unit: 'cups' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Sauté onion, carrots, and celery until soft.' },
        { number: 2, step: 'Add garlic and cumin, cook 1 minute.' },
        { number: 3, step: 'Add lentils and broth. Bring to a boil.' },
        { number: 4, step: 'Simmer 20 minutes until lentils are tender.' },
        { number: 5, step: 'Season and serve with crusty bread.' },
      ]}],
    },
    {
      id: 'l4',
      title: 'Caprese Salad with Grilled Chicken',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
      readyInMinutes: 20,
      servings: 2,
      mealCategory: 'lunch',
      extendedIngredients: [
        { name: 'chicken breast', amount: 8, unit: 'oz' },
        { name: 'fresh mozzarella', amount: 4, unit: 'oz' },
        { name: 'heirloom tomatoes', amount: 2, unit: '' },
        { name: 'fresh basil', amount: 0.25, unit: 'cup' },
        { name: 'balsamic glaze', amount: 2, unit: 'tbsp' },
        { name: 'olive oil', amount: 1, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Season chicken with salt, pepper, and olive oil. Grill 6 minutes per side.' },
        { number: 2, step: 'Slice tomatoes and mozzarella.' },
        { number: 3, step: 'Arrange caprese on a plate, top with sliced chicken and basil.' },
        { number: 4, step: 'Drizzle with balsamic glaze.' },
      ]}],
    },
    {
      id: 'l5',
      title: 'Asian Noodle Salad',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      readyInMinutes: 20,
      servings: 2,
      mealCategory: 'lunch',
      extendedIngredients: [
        { name: 'rice noodles', amount: 4, unit: 'oz' },
        { name: 'edamame', amount: 0.5, unit: 'cup' },
        { name: 'shredded carrots', amount: 0.5, unit: 'cup' },
        { name: 'cucumber', amount: 1, unit: '' },
        { name: 'sesame oil', amount: 1, unit: 'tbsp' },
        { name: 'soy sauce', amount: 2, unit: 'tbsp' },
        { name: 'rice vinegar', amount: 1, unit: 'tbsp' },
        { name: 'sesame seeds', amount: 1, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Cook rice noodles per package, rinse with cold water.' },
        { number: 2, step: 'Whisk together sesame oil, soy sauce, and rice vinegar.' },
        { number: 3, step: 'Toss noodles with vegetables and dressing.' },
        { number: 4, step: 'Top with sesame seeds.' },
      ]}],
    },
  ],
  dinner: [
    {
      id: 'd1',
      title: 'Herb-Roasted Chicken Thighs',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
      readyInMinutes: 45,
      servings: 4,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'chicken thighs', amount: 4, unit: '' },
        { name: 'garlic', amount: 4, unit: 'cloves' },
        { name: 'fresh rosemary', amount: 2, unit: 'sprigs' },
        { name: 'fresh thyme', amount: 4, unit: 'sprigs' },
        { name: 'olive oil', amount: 3, unit: 'tbsp' },
        { name: 'lemon', amount: 1, unit: '' },
        { name: 'potatoes', amount: 1, unit: 'lb' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Preheat oven to 425°F.' },
        { number: 2, step: 'Mix olive oil, minced garlic, rosemary, and thyme.' },
        { number: 3, step: 'Coat chicken and cubed potatoes with herb mixture.' },
        { number: 4, step: 'Arrange in a roasting pan. Squeeze lemon over everything.' },
        { number: 5, step: 'Roast 35–40 minutes until chicken is golden and potatoes are tender.' },
      ]}],
    },
    {
      id: 'd2',
      title: 'Salmon with Asparagus',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      readyInMinutes: 25,
      servings: 2,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'salmon fillets', amount: 2, unit: '' },
        { name: 'asparagus', amount: 1, unit: 'bunch' },
        { name: 'garlic', amount: 2, unit: 'cloves' },
        { name: 'butter', amount: 2, unit: 'tbsp' },
        { name: 'lemon', amount: 1, unit: '' },
        { name: 'dill', amount: 2, unit: 'tsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Preheat oven to 400°F.' },
        { number: 2, step: 'Place salmon and asparagus on a sheet pan.' },
        { number: 3, step: 'Dot with butter, garlic, dill, and lemon slices.' },
        { number: 4, step: 'Roast 15–18 minutes until salmon flakes easily.' },
      ]}],
    },
    {
      id: 'd3',
      title: 'Black Bean Tacos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
      readyInMinutes: 20,
      servings: 2,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'black beans', amount: 1, unit: 'can' },
        { name: 'corn tortillas', amount: 6, unit: '' },
        { name: 'avocado', amount: 1, unit: '' },
        { name: 'red cabbage', amount: 1, unit: 'cup' },
        { name: 'lime', amount: 1, unit: '' },
        { name: 'cumin', amount: 1, unit: 'tsp' },
        { name: 'salsa', amount: 0.5, unit: 'cup' },
        { name: 'cilantro', amount: 2, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Warm beans with cumin and salt in a skillet.' },
        { number: 2, step: 'Warm tortillas in a dry pan.' },
        { number: 3, step: 'Mash avocado with lime juice.' },
        { number: 4, step: 'Assemble tacos with beans, avocado, cabbage, salsa, and cilantro.' },
      ]}],
    },
    {
      id: 'd4',
      title: 'Pasta Primavera',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
      readyInMinutes: 30,
      servings: 4,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'penne pasta', amount: 12, unit: 'oz' },
        { name: 'zucchini', amount: 1, unit: '' },
        { name: 'bell peppers', amount: 2, unit: '' },
        { name: 'cherry tomatoes', amount: 1, unit: 'cup' },
        { name: 'garlic', amount: 3, unit: 'cloves' },
        { name: 'olive oil', amount: 3, unit: 'tbsp' },
        { name: 'Parmesan', amount: 0.5, unit: 'cup' },
        { name: 'fresh basil', amount: 0.25, unit: 'cup' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Cook pasta according to package directions. Reserve 1 cup pasta water.' },
        { number: 2, step: 'Sauté garlic in olive oil until fragrant.' },
        { number: 3, step: 'Add vegetables and cook until tender-crisp.' },
        { number: 4, step: 'Toss with pasta, adding pasta water to loosen.' },
        { number: 5, step: 'Finish with Parmesan and fresh basil.' },
      ]}],
    },
    {
      id: 'd5',
      title: 'Beef & Broccoli Stir Fry',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
      readyInMinutes: 25,
      servings: 3,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'flank steak', amount: 1, unit: 'lb' },
        { name: 'broccoli florets', amount: 3, unit: 'cups' },
        { name: 'soy sauce', amount: 3, unit: 'tbsp' },
        { name: 'oyster sauce', amount: 2, unit: 'tbsp' },
        { name: 'garlic', amount: 3, unit: 'cloves' },
        { name: 'ginger', amount: 1, unit: 'tsp' },
        { name: 'sesame oil', amount: 1, unit: 'tbsp' },
        { name: 'cornstarch', amount: 1, unit: 'tbsp' },
        { name: 'jasmine rice', amount: 2, unit: 'cups' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Slice steak thin against the grain. Marinate in soy sauce, garlic, ginger, and cornstarch for 10 min.' },
        { number: 2, step: 'Cook rice according to package.' },
        { number: 3, step: 'Stir fry steak in a hot wok until browned. Remove.' },
        { number: 4, step: 'Stir fry broccoli until bright green.' },
        { number: 5, step: 'Add steak back, drizzle with oyster sauce and sesame oil. Serve over rice.' },
      ]}],
    },
    {
      id: 'd6',
      title: 'Butternut Squash Soup',
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
      readyInMinutes: 45,
      servings: 4,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'butternut squash', amount: 1, unit: 'large' },
        { name: 'onion', amount: 1, unit: '' },
        { name: 'garlic', amount: 3, unit: 'cloves' },
        { name: 'vegetable broth', amount: 4, unit: 'cups' },
        { name: 'coconut milk', amount: 0.5, unit: 'cup' },
        { name: 'nutmeg', amount: 0.25, unit: 'tsp' },
        { name: 'olive oil', amount: 2, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Peel and cube squash. Roast with olive oil at 400°F for 25 minutes.' },
        { number: 2, step: 'Sauté onion and garlic until soft.' },
        { number: 3, step: 'Add roasted squash and broth. Simmer 10 minutes.' },
        { number: 4, step: 'Blend until smooth. Stir in coconut milk and nutmeg.' },
        { number: 5, step: 'Season and serve with crusty bread.' },
      ]}],
    },
    {
      id: 'd7',
      title: 'Shrimp Fried Rice',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
      readyInMinutes: 25,
      servings: 3,
      mealCategory: 'dinner',
      extendedIngredients: [
        { name: 'cooked rice', amount: 3, unit: 'cups' },
        { name: 'shrimp', amount: 0.75, unit: 'lb' },
        { name: 'frozen peas', amount: 0.5, unit: 'cup' },
        { name: 'carrots', amount: 2, unit: '' },
        { name: 'eggs', amount: 3, unit: '' },
        { name: 'soy sauce', amount: 3, unit: 'tbsp' },
        { name: 'sesame oil', amount: 1, unit: 'tbsp' },
        { name: 'green onions', amount: 3, unit: '' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Heat oil in a wok over high heat. Cook shrimp until pink, set aside.' },
        { number: 2, step: 'Stir fry carrots until tender. Push to the side.' },
        { number: 3, step: 'Scramble eggs in the wok.' },
        { number: 4, step: 'Add rice and peas, breaking up clumps. Stir fry 3 minutes.' },
        { number: 5, step: 'Add shrimp back. Season with soy sauce and sesame oil. Top with green onions.' },
      ]}],
    },
  ],
  snack: [
    {
      id: 's1',
      title: 'Apple Slices with Almond Butter',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
      readyInMinutes: 5,
      servings: 1,
      mealCategory: 'snack',
      extendedIngredients: [
        { name: 'apple', amount: 1, unit: '' },
        { name: 'almond butter', amount: 2, unit: 'tbsp' },
        { name: 'cinnamon', amount: 0.25, unit: 'tsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Core and slice the apple.' },
        { number: 2, step: 'Serve with almond butter for dipping and a sprinkle of cinnamon.' },
      ]}],
    },
    {
      id: 's2',
      title: 'Hummus & Veggie Plate',
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop',
      readyInMinutes: 5,
      servings: 2,
      mealCategory: 'snack',
      extendedIngredients: [
        { name: 'hummus', amount: 0.5, unit: 'cup' },
        { name: 'carrots', amount: 2, unit: '' },
        { name: 'celery', amount: 3, unit: 'stalks' },
        { name: 'cucumber', amount: 0.5, unit: '' },
        { name: 'bell pepper', amount: 0.5, unit: '' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Cut vegetables into sticks.' },
        { number: 2, step: 'Arrange on a plate with hummus in the center.' },
      ]}],
    },
    {
      id: 's3',
      title: 'Trail Mix',
      image: 'https://images.unsplash.com/photo-1607897510985-9c15c5e26a81?w=400&h=300&fit=crop',
      readyInMinutes: 2,
      servings: 2,
      mealCategory: 'snack',
      extendedIngredients: [
        { name: 'mixed nuts', amount: 0.5, unit: 'cup' },
        { name: 'dried cranberries', amount: 0.25, unit: 'cup' },
        { name: 'dark chocolate chips', amount: 2, unit: 'tbsp' },
        { name: 'sunflower seeds', amount: 2, unit: 'tbsp' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Combine all ingredients in a bowl or zip bag.' },
        { number: 2, step: 'Portion into serving sizes.' },
      ]}],
    },
    {
      id: 's4',
      title: 'Banana Smoothie',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=300&fit=crop',
      readyInMinutes: 5,
      servings: 1,
      mealCategory: 'snack',
      extendedIngredients: [
        { name: 'banana', amount: 1, unit: '' },
        { name: 'almond milk', amount: 1, unit: 'cup' },
        { name: 'peanut butter', amount: 1, unit: 'tbsp' },
        { name: 'honey', amount: 1, unit: 'tsp' },
        { name: 'ice', amount: 0.5, unit: 'cup' },
      ],
      analyzedInstructions: [{ steps: [
        { number: 1, step: 'Combine all ingredients in a blender.' },
        { number: 2, step: 'Blend until smooth and creamy.' },
        { number: 3, step: 'Pour into a glass and enjoy immediately.' },
      ]}],
    },
  ],
}

function pickRandom(arr, exclude = []) {
  const pool = arr.filter(r => !exclude.includes(r.id))
  if (!pool.length) return arr[Math.floor(Math.random() * arr.length)]
  return pool[Math.floor(Math.random() * pool.length)]
}

export function rerollCategory(mealType) {
  const pool = MOCK_RECIPES[mealType] || []
  return pickRandom(pool)
}

export function rerollDay(settings) {
  const meals = settings?.meals || ['breakfast', 'lunch', 'dinner']
  const day = {}
  meals.forEach(meal => {
    day[meal] = rerollCategory(meal)
  })
  return day
}

export function generateWeekPlan(settings) {
  const meals = settings?.meals || ['breakfast', 'lunch', 'dinner']
  const plan = {}
  DAYS.forEach(day => {
    plan[day] = {}
    meals.forEach(meal => {
      plan[day][meal] = rerollCategory(meal)
    })
  })
  return plan
}

export function getAllRecipes() {
  return Object.values(MOCK_RECIPES).flat()
}

export const DAYS_OF_WEEK = DAYS
