function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var about = document.getElementById("about");
    if (member.style.display === "none") {
        member.style.display = "block";
        skills.style.display = "none";
        projects.style.display = "none";
        contact.style.display = "none";
        about.style.display = "none";
    } else {
        member.style.display = "none";
    }
}