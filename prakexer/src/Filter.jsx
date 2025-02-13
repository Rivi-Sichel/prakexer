// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";

// const FilterComponent = ({ contacts, onFilter }) => {
//   const [selectedTag, setSelectedTag] = useState("All");
//   const [selectedType, setSelectedType] = useState("All");
//   const [activeContact, setActiveContact] = useState("All");
//   const [isMainContact, setIsMainContact] = useState(false);

//   const handleFilter = () => {
//     let filteredContacts = contacts;
//     if (selectedTag !== "All") {
//       filteredContacts = filteredContacts.filter(contact => contact.tag === selectedTag);
//     }
//     if (selectedType !== "All") {
//       filteredContacts = filteredContacts.filter(contact => contact.type === selectedType);
//     }
//     if (activeContact !== "All") {
//       filteredContacts = filteredContacts.filter(contact => contact.active.toString() === activeContact);
//     }
//     if (isMainContact) {
//       filteredContacts = filteredContacts.filter(contact => contact.isMain);
//     }
//     onFilter(filteredContacts);
//   };

//   return (
//     <Card className="p-4 w-72">
//       <CardContent>
//         <h3 className="text-lg font-bold">Filter</h3>
        
//         <label className="block mt-2">Contact Type</label>
//         <Select onValueChange={setSelectedType}>
//           <SelectTrigger>
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="Client">Client</SelectItem>
//             <SelectItem value="Supplier">Supplier</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <label className="block mt-2">Tags</label>
//         <Select onValueChange={setSelectedTag}>
//           <SelectTrigger>
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="VIP">VIP</SelectItem>
//             <SelectItem value="Regular">Regular</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <label className="block mt-2">Active Contact</label>
//         <Select onValueChange={setActiveContact}>
//           <SelectTrigger>
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="true">Active</SelectItem>
//             <SelectItem value="false">Inactive</SelectItem>
//           </SelectContent>
//         </Select>
        
//         <label className="block mt-2 flex items-center justify-between">Main Contact
//           <Switch checked={isMainContact} onCheckedChange={setIsMainContact} />
//         </label>
        
//         <div className="flex justify-between mt-4">
//           <Button variant="outline" onClick={() => onFilter(contacts)}>Reset</Button>
//           <Button onClick={handleFilter}>Apply</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default FilterComponent;
