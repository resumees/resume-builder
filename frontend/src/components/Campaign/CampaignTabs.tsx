// // Sidebar.js
// import React, { useEffect, useState } from 'react';
// import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Spinner, Text } from '@chakra-ui/react';
// import { Link, Route, Routes, useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const SideNav = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaign`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       } catch (error) {
//         console.error(`Fetch campaigns error:`, error)
//     };

//     fetchCampaigns();
//   }, []);

//   // Handle tab change
//   const handleTabChange = (index) => {
//     const selectedPath = campaigns[index]?.path || '/';
//     navigate(selectedPath);
//   };

//   // Find the active tab index based on the current path
//   const activeTabIndex = campaigns.findIndex(campaign => campaign.path === location.pathname);

//   if (loading) return <Spinner />;
//   if (error) return <Text color="red.500">{error}</Text>;

//   return (
//     <Box width="250px" borderRight="1px" borderColor="gray.200" p="4">
//       <Tabs orientation="vertical" index={activeTabIndex} onChange={handleTabChange}>
//         <TabList>
//           {campaigns.map((campaign) => (
//             <Tab key={campaign._id} as={Link} to={`/campaign/${campaign._id}`}>
//               {campaign.documentName}
//             </Tab>
//           ))}
//         </TabList>
//         <TabPanels>
//           {campaigns.map((campaign) => (
//             <TabPanel key={campaign._id}>
//               {/* Content for each campaign tab */}
//               <Routes>
//                 <Route path={`/campaign/${campaign._id}`} element={<div>{campaign.documentDescription}</div>} />
//               </Routes>
//             </TabPanel>
//           ))}
//         </TabPanels>
//       </Tabs>
//     </Box>
//   );
// };

// export default SideNav;
