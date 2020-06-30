export const exec_name = [
  "Akshat Raj Vansh",
  "Garima Bansal",
  "Danish Sheikh",
  "Dhrumil Patadia",
  "Kaustubh Bhatt",
  "Vishal kumar",
  "Jai Singh Malhotra",
  "Nagendra singh",
  "Niti Kaur",
  "Rishabh Dhenkawat",
  "Wable Sanket",
  "Sarita Singh",
  "Shreyansh Jain",
  "Chandan Sitlani",
  "Swayam Kaul",
  "Tarannum perween",
  "Vidhi Shekhawat",
  "Yash Raj",
  "Yugal Sharma",
  "Yugansh Jain"
];
export const exec_num = [
  "7355026029",
  "6230413685",
  "8628821956",
  "7591886642",
  "8351070350",
  "6203831026",
  "6230024131",
  "8290068061",
  "9625497440",
  "9882144203",
  "9521205830",
  "7989204336",
  "8302828230",
  "8580635669",
  "8219777427",
  "6200015660",
  "8696185185",
  "8449425570",
  "8351970590",
  "8894901801"
];

export const vol_name = [
  "Akhilesh Kushwaha",
  "Aryan verma",
  "Baibhav",
  "Deepak Rana ",
  "Deepam Shyam ",
  "Dhruv Aggarwal",
  "Dibakar Chaudhary",
  "Hardik Gupta",
  "Hitesh malav",
  "Kratika Mittal ",
  "Lavisha Bhambri",
  "Mohd Nomaan",
  "Navdeep Singh Rathore",
  "Nitin bansal",
  "Parth saini",
  "Pranjali Singh",
  "Prateek Gupta",
  "Prateek Srivastava",
  "Pratham Tripathi",
  "Priyan Sood",
  "Ritik kundlas",
  "Ritika lohia",
  "Samriddh Singh",
  "Samyak Jain",
  "Shreya Dubey",
  "Shubham Goyal",
  "Shubham Thakur",
  "Ujjwal Chaudhary",
  "Vaibhav Pathak ",
  "Vasvi Sood"
];

export const vol_num = [
  "9140237841",
  "8057233599",
  "6387978916",
  "8368952470",
  "9079955116",
  "9997144055",
  "9749103505",
  "9315180198",
  "6376436748",
  "8860306000",
  "8920616228",
  "7309316777",
  "9409052197",
  "9636010622",
  "7018289859",
  "9403667050",
  "8439999116",
  "6230077791",
  "9315690658",
  "8219299132",
  "8580854032",
  "9875001501",
  "7018281212",
  "7591035062",
  "7044287988",
  "8570085821",
  "8219462719",
  "7428868740",
  "9910517217",
  "7018161701"
];

export const coord_name = [
  "Sumit Kumar Verma",
  "Amit Nirala",
  "Pradyuman",
  "Pragay Shourya Moudgil",
  "Rajeev Ranjan Maurya",
  "Sagar Singh",
  "Suyash Tripathy",
  "Utkarsh Tiwari",
  "Vineet Sharma",
  "Pranjal Aggarwal"
];

export const coord_num = [
  "9772621183",
  "7649958974",
  "8219748551",
  "9459733550",
  "7348558928",
  "8005411549",
  "9340126220",
  "8318680570",
  "9210347740",
  "7590052608"
];

export const exec = exec_name.map((s, i) => ({
  phone: exec_num[i],
  name: exec_name[i]
}));
export const vol = vol_name.map((s, i) => ({
  phone: vol_num[i],
  name: vol_name[i]
}));
export const coord = coord_name.map((s, i) => ({
  phone: coord_num[i],
  name: coord_name[i]
}));
