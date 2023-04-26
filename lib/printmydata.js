//in delevopment - may scrap

const empLogo = ()=>{
console.log(`_______________________________________________________,`);
console.log(`|    ______                 _                          |`);
console.log(`|   |  ____|               | |                         |`);
console.log(`|   | |__   _ __ ___  _ __ | | ___  _   _  ___  ___    |`);
console.log(`|   |  __| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   |`);
console.log(`|   | |____| | | | | | |_) | | (_) | |_| |  __/  __/   |`);
console.log(`|   |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|   |`);
console.log(`|                    | |             __/ |             |`);
console.log(`|                    |_|            |___/              |`);
console.log(`|                                                      | `);
console.log(`|     __  __                                  	       |`);
console.log(`|    |  \\/  |                                          |`);
console.log(`|    | \\  / | __ _ _ __   __ _  __ _  ___ _ __         |`);
console.log(`|    | |\\/| |/ _ \`| '_ \\ / _\` |/ _\` |/ _ \\ '__|        |`);
console.log(`|    | |  | | (_| | | | | (_| | (_| |  __/ |   	       |`);
console.log(`|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|           |`);
console.log(`|   	                        __/ |                  |`);
console.log(`|                              |___/                   |`);
console.log(`|______________________________________________________|`);
}

const maxLength = (data)=>{

	return data.reduce((acc, curr) => {
    if (curr.length > acc) {
      return curr.length;
    }
    return acc;
  	}, 0);
}
function printMe(data){
// const data = [
// 	{
// 		"name": "John Doe",
// 		"role": "Sales Lead",
// 		"salary": "100000",
// 		"department": "Engineering"
// 	},
// 	{
// 		"name": "Mike Chan",
// 		"role": "Salesperson",
// 		"salary": "80000",
// 		"department": "Engineering"
// 	},
// 	{
// 		"name": "Ashley Rodriguez",
// 		"role": "Lead Engineer",
// 		"salary": "150000",
// 		"department": "Legal"
// 	},
// 	{
// 		"name": "Kevin Tupik",
// 		"role": "Software Engineer",
// 		"salary": "120000",
// 		"department": "Legal"
// 	},
// 	{
// 		"name": "Sarah Lourd",
// 		"role": "Legal Team Lead",
// 		"salary": "250000",
// 		"department": "Legal"
// 	},
// 	{
// 		"name": "Tom Allen",
// 		"role": "Laywer",
// 		"salary": "190000",
// 		"department": "Legal"
// 	},
// 	{
// 		"name": "Kunal Singh",
// 		"role": "Account Manager",
// 		"salary": "160000",
// 		"department": "Finance"
// 	},
// 	{
// 		"name": "Malia Brown",
// 		"role": "Accountant",
// 		"salary": "125000",
// 		"department": "Finance"
// 	}
// ];
const headers = Object.keys(data[0]);
const newdf = (array,tVal)=>{
	//give new array
	let newarray =[];
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		for (const key in element) {
			if (key === tVal) {
				const value = element[key];
				if (value != null) {
					newarray.push(value);
				}
				
				break;
			}
		}
		
	}
	return newarray;
}
let columns = []
for (let i = 0; i < headers.length; i++) {
	columns.push(maxLength(newdf(data,headers[i])));
	headers[i] = headers[i].padEnd(maxLength(newdf(data,headers[i])));
}


// Print column headers
console.log(`| ${headers.join(" | ")} |`);

// Print separator line
let PSL ='';
for (let i = 0; i < columns.length; i++) {
	const element = columns[i];
	PSL += `${(i == 0 || i+1 > columns.length)?'|':''} ${"-".repeat(element)} ${(i+1) > columns.length?'-':(i+1)==columns.length?'|':'+'}`
}

console.log(PSL);
// console.log(`|${"-".repeat(18)}+${"-".repeat(19)}+${"-".repeat(8)}+${"-".repeat(13)}|`);

// Print data rows

for (const row of data) {
	let DATAROW = `|`;
	let p = 0;
	for (const key in row) {
		// if (Object.hasOwnProperty.call(object, key)) {
			const element = row[key];
			DATAROW += ` ${element} |`;
			p++;
		// }
	}
//   console.log(`| ${row.name.padEnd(16)} | ${row.role.padEnd(17)} | ${row.salary.toString().padStart(6)} | ${row.department.padEnd(11)} |`);
console.log(DATAROW)
}


// Print closingseparator line
// Print separator line
PSL ='';
for (let i = 0; i < columns.length; i++) {
	const element = columns[i];
	PSL += `${(i == 0 || i+1 > columns.length)?'|':''} ${"-".repeat(element)} ${(i+1) > columns.length?'-':(i+1)==columns.length?'|':'+'}`
}

console.log(PSL);
// Print closing separator line
// console.log(`|${"-".repeat(18)}+${"-".repeat(19)}+${"-".repeat(8)}+${"-".repeat(13)}|`);
}

module.exports = {printMe,empLogo}

