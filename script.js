let title = document.getElementById('recipe-title');
let ingredient = document.getElementById('ingredient-input');
let instruction = document.getElementById('instructions-input');
let recipe = {title: title.value, ingredients: [], instructions: []};
let ingredientButton = document.getElementById('ingredient-button');
let instructionButton = document.getElementById('instruction-button');
let resetButton = document.getElementById('reset-button');
let saveButton = document.getElementById('save-button');

title.addEventListener('change', (e) => {recipe.title = title.value})
ingredientButton.addEventListener('click', addElement);
ingredientButton.addEventListener('keypress', (e) => {
    if (e.key === 'Space'){
        addElement();
    }
})
ingredientButton.addEventListener('mousedown', (e) => {
    ingredientButton.classList.add('button-on');
})
ingredientButton.addEventListener('mouseup', (e) => {
    ingredientButton.classList.remove('button-on');
})
instructionButton.addEventListener('click', addElement);
ingredient.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addElement();
    }
})
ingredientButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        addElement();
    }
})
instructionButton.addEventListener('mousedown', (e) => {
    instructionButton.classList.add('button-on');
})
instructionButton.addEventListener('mouseup', (e) => {
    instructionButton.classList.remove('button-on');
})
instructionButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' '){
        addElement();
    }
})
instruction.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addElement();
    }
})
resetButton.addEventListener('mousedown', (e) => {
    resetButton.classList.add('button-on');
})
resetButton.addEventListener('mouseup', (e) => {
    resetButton.classList.remove('button-on');
    window.location.reload();
    recipe.title.remove()
    recipe.ingredients.remove()
    recipe.instructions.remove()
})
resetButton.addEventListener('keypress', (e) => {if (e.key === 'Enter' || e.key === ' '){
    window.location.reload();
    recipe.title.remove()
    recipe.ingredients.remove()
    recipe.instructions.remove()
}})

saveButton.addEventListener('mousedown', (e) => {
    saveButton.classList.add('button-on');
})
saveButton.addEventListener('mouseup', (e) => {
    saveButton.classList.remove('button-on');
})


function addElement() {
    let newElement = document.createElement('div');
    newElement.tabIndex = 0;
    newElement.style.marginLeft = '5px';
    newElement.classList.add('newElement')
    newElement.addEventListener('click', (e) => {newElement.remove()})
    newElement.addEventListener('keypress', (e) => {if(e.key === 'Enter' || e.key === ' ') {newElement.remove(); console.log(e.key)}})
    if (ingredient.value) {
        newElement.innerHTML = ingredient.value;
        newElement.dataset.ingredient = ingredient.value;
        newElement.setAttribute('aria-label', newElement.innerHTML + 'ingredient')
        if (document.getElementById('fillerIngredient')) {
            document.getElementById('fillerIngredient').remove();
        }
        let ingContain = document.getElementById('ingredients-container');
        ingContain.style.alignItems = 'left';
        ingContain.style.justifyContent = 'top';
        document.getElementById('ingredients-container').appendChild(newElement);
        recipe.ingredients.push(newElement.innerHTML);
        return ingredient.value = '';
    }
    if (instruction.value) {
        newElement.innerHTML = instruction.value;
        newElement.dataset.instruction = instruction.value;
        newElement.setAttribute('aria-label', newElement.innerHTML + 'instruction')
        if (document.getElementById('fillerInstruction')) {
            document.getElementById('fillerInstruction').remove();
        }
        let instrContain = document.getElementById('instructions-container')
        instrContain.style.alignItems = 'left';
        instrContain.style.justifyContent = 'top';
        document.getElementById('instructions-container').appendChild(newElement);
        recipe.instructions.push(newElement.innerHTML);
        return instruction.value = '';
    }
}
function check() {
    let error = document.createElement('p')
    let errorDiv = document.getElementById('error-message')
    if (!recipe.title) {
        error.innerHTML = 'You must provide a recipe title.';
        if (errorDiv.children.length < 1) {errorDiv.appendChild(error)}
        errorDiv.style.visibility = 'visible'
    }
    else if (recipe.ingredients.length < 1) {
        error.innerHTML = 'You must provide at least 1 ingredient.';
        if (errorDiv.children.length < 1) {errorDiv.appendChild(error)}
        errorDiv.style.visibility = 'visible'
    }
    else if (recipe.instructions.length < 1) {
        error.innerHTML = 'You must provide at least 1 instruction.';
        if (errorDiv.children.length < 1) {errorDiv.appendChild(error)}
        errorDiv.style.visibility = 'visible'

    }
    else {
        writeRecipeToFile(recipe);
    }}
saveButton.addEventListener('click', (e) => {
    check()
})
saveButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        check()
    }
})

function writeRecipeToFile(recipe) {
    // taking from
    function download(text, filename){
        var blob = new Blob([text], {type: "text/html"});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
    const output = `
    <html>
      <head>
        <style>
          :root {
            font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
          }
          h1 {
            background-color: rgb(15,35,57);
            color: white;
            padding: 16px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .b-main {
            width: 600px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
          }
          .b-content {
            padding: 16px;
            display: flex;
            gap: 16px;
          }
          .b-ingredients {
            flex: 1
          }
          .b-instructions {
            flex: 1
          }
        </style>
      </head>
      <body>
        <main class="b-main">
          <h1>${recipe.title}</h1>
          <div class="b-content">
            <div class="b-ingredients">
              <strong>Ingredients</strong>
              <hr>
              ${
        recipe.ingredients.map(i => (
            `
                    <div>${i}</div>
                  `
        )).join('')
    }
            </div>
            <div class="instructions">
              <strong>Instructions</strong>
              <hr>
              ${
        recipe.instructions.map((i, index) => (
            `
                    <div>${index+1}: ${i}</div>
                  `
        )).join('')
    }
            </div>
          </div>
        </main>
      </body>
    </html>
  `;
    download(output, `recipe-card.html`);
}

