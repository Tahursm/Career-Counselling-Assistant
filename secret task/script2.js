// Sample data for internships, courses, and articles
const internships = [
    { title: "Software Engineering Internship", industry: "Technology", location: "Remote", skills_required: ["Python", "JavaScript"] },
    { title: "Marketing Internship", industry: "Marketing", location: "New York", skills_required: ["SEO", "Content Creation"] },
    { title: "Data Science Internship", industry: "Technology", location: "San Francisco", skills_required: ["Python", "Machine Learning"] },
];

const courses = [
    { title: "Machine Learning by Stanford", platform: "Coursera", industry: "Technology", level: "Advanced" },
    { title: "Digital Marketing Fundamentals", platform: "Udemy", industry: "Marketing", level: "Beginner" },
    { title: "Python for Data Science", platform: "edX", industry: "Technology", level: "Intermediate" },
];

const articles = [
    { title: "The Future of AI in Tech", industry: "Technology", content: "AI is rapidly transforming industries..." },
    { title: "How SEO is Changing the Digital Landscape", industry: "Marketing", content: "SEO strategies are constantly evolving..." },
    { title: "Data Science Trends in 2024", industry: "Technology", content: "Data Science continues to grow and evolve..." },
];

// Function to filter resources based on student input
function generateResourcePack() {
    const interests = document.getElementById("interests").value.split(",").map(i => i.trim().toLowerCase());
    const goals = document.getElementById("goals").value.split(",").map(g => g.trim().toLowerCase());
    const skills = document.getElementById("skills").value.split(",").map(s => s.trim().toLowerCase());

    const filteredInternships = internships.filter(i => interests.some(interest => i.industry.toLowerCase().includes(interest)) && skills.some(skill => i.skills_required.some(s => s.toLowerCase() === skill)));
    const filteredCourses = courses.filter(c => interests.some(interest => c.industry.toLowerCase().includes(interest)));
    const filteredArticles = articles.filter(a => interests.some(interest => a.industry.toLowerCase().includes(interest)));

    // Display the results
    let resourcePackHTML = "<h2>Your Personalized Resource Pack</h2>";

    // Internships
    if (filteredInternships.length > 0) {
        resourcePackHTML += "<h3>Internships</h3>";
        filteredInternships.forEach(i => {
            resourcePackHTML += `
                <div class="resource-card">
                    <h3>${i.title}</h3>
                    <p><strong>Location:</strong> ${i.location}</p>
                    <p class="skills"><strong>Skills Required:</strong> ${i.skills_required.join(", ")}</p>
                </div>
            `;
        });
    } else {
        resourcePackHTML += "<p>No matching internships found.</p>";
    }

    // Courses
    if (filteredCourses.length > 0) {
        resourcePackHTML += "<h3>Courses</h3>";
        filteredCourses.forEach(c => {
            resourcePackHTML += `
                <div class="resource-card">
                    <h3>${c.title} on ${c.platform}</h3>
                    <p><strong>Level:</strong> ${c.level}</p>
                </div>
            `;
        });
    } else {
        resourcePackHTML += "<p>No matching courses found.</p>";
    }

    // Articles
    if (filteredArticles.length > 0) {
        resourcePackHTML += "<h3>Articles</h3>";
        filteredArticles.forEach(a => {
            resourcePackHTML += `
                <div class="resource-card">
                    <h3>${a.title}</h3>
                    <p>${a.content.substring(0, 100)}...</p>
                </div>
            `;
        });
    } else {
        resourcePackHTML += "<p>No matching articles found.</p>";
    }

    // Set the generated HTML to the resource section
    document.getElementById("resource-pack").innerHTML = resourcePackHTML;
}
