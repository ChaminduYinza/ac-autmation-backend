var config = {};

config.pendingStatus = "Pending";
config.approveStatus = "Approved";
config.rejectedStatus = "Rejected";
config.newStatus = "New";
config.minValue = 14;
config.maxValue = 29;
config.ageMapping = [{
    ageGroup: 10,
    temperature: 25
},
{
    ageGroup: 20,
    temperature: 17
},
{
    ageGroup: 30,
    temperature: 17
},
{
    ageGroup: 40,
    temperature: 18
},
{
    ageGroup: 50,
    temperature: 20
},
{
    ageGroup: 60,
    temperature: 22
},
{
    ageGroup: 70,
    temperature: 24
},
{
    ageGroup: 80,
    temperature: 26
},
{
    ageGroup: 90,
    temperature: 28
},
{
    ageGroup: 100,
    temperature: 30
},
{
    ageGroup: 110,
    temperature: 30
}]

module.exports = config;