import { readFile, writeFile } from 'fs';

readFile('words.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const words = data.trim().split('\n');
    writeFile('words.json', JSON.stringify(words), (err) => {
        if (err) throw err;
        console.log('words.json file created successfully!');
    });
});
