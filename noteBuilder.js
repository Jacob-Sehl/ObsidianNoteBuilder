const fileName = tp.file.title;
let fileType = await tp.system.suggester(["📝 Note", "🗺️ MOC"], ["note", "moc"]);

if(fileType == "note"){
	fileType = await tp.system.suggester(['Study/Work','To Watch','Personal',"📖 Book", "🍽️ Recipe", 'References and Annotations'],['learn','watch','personal','book','recipe','review']);
}

await tp.file.rename(fileName)  
  
let filePath = "000 Inbox/"+fileName  
let mocQuery = ""
let xamldf = "aliases:\ntags: "+fileType+"\nTopics: -\nReferences:"
  
switch (fileType) {  
 case 'moc':  
  filePath = "001 MOC/"+fileName  
  mocQuery = '```dataview\nLIST\nFROM "001 Notes"\nWHERE contains(Topics,[['+fileName+']])\n```'  
  break;  
 case 'seed':  
  filePath = "001 Notes/"+fileName  
  break;
  case 'learn':
  filePath = '300 School or Work/'+fileName
  break;
  case 'watch':
  filePath = '100 Watch List/'+fileName
  break;
  case 'personal':
  filePath = '400 Personal/'+fileName
  break;
  case 'review':
  filePath = '200 References/'+fileName
  break;
  case 'book':
  filePath = '100 Watch List/Books/'+fileName
  xamldf = "tags: "+fileType+"\nStatus:\nAuthor:\nSummary:\nGenre: -\nLink:"
  break;
  case 'recipe':
  filePath = '100 Watch List/Recipes/'+fileName
  xamldf = "tags: "+fileType+"\nCuisine: -\nSummary:\nIngredients: -\ndg-publish: true"
mocQuery = '## Ingredients\n\n| Amount        | Ingredient    | Description    |\n| ------------- | ------------- | -------------- |\n\n## Instructions\n\n'  
  break;
 }  
 
await tp.file.move(filePath)