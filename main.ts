//  listing element
document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    //type assertion
    const profilePictureInput = document.getElementById(
      `profilePicture`
    ) as HTMLInputElement;
    const nameElement = document.getElementById(`name`) as HTMLInputElement;
    const emailElement = document.getElementById(`email`) as HTMLInputElement;
    const phoneElement = document.getElementById(`phone`) as HTMLInputElement;
    const educationElement = document.getElementById(
      `education`
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      `experience`
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      `skills`
    ) as HTMLTextAreaElement;

    const usernameElement = document.getElementById(
      "Username"
    ) as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;
      const uniquePath = `resumes/${username.replace(/\s+/g, "_")}_Resume.html`;

      //profile picture

      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";
      // resume output
      const resumeOutput = `<h2>Resume</h2>
${
  profilePictureURL
    ? `<img src ="${profilePictureURL}" alt= "Profile Picture" class ="profilePicture">`
    : ""
}
<p><strong>Name:</strong> <span id ="edit-name" class ="editable"> ${name} </span></p>
<p><strong>Email:</strong> <span id ="edit-email" class ="editable"> ${email} </span></p>
<p><strong>phoneNumber:</strong> <span id ="edit-phone" class ="editable"> ${phone} </span></p>

<h3>Education</h3>
<p id ="edit-education" class ="editable">${education}</p>

<h3>Experience</h3>
<p id ="edit-experience" class ="editable">${experience}</p>


<h3>Skills</h3>
<p id ="edit-skills" class ="editable">${skills}</p>`;

      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();

        resumeOutputElement.classList.remove("hidden");

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          window.print();
        });
        buttonsContainer.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        (shareLinkButton.textContent = "copy Shareable Link"),
          shareLinkButton.addEventListener("click", async () => {
            try {
              const shareableLink = `https://yourdomain.com/resume/${name.replace(
                /\s+/g,
                "_"
              )}_resume.html`;
              await navigator.clipboard.writeText(shareableLink);
              alert("Shareable link copied to clipboard!");
            } catch (err) {
              console.error("Failed to copy link: ", err);
              alert("Failed to copy link to clipboard, Please try agin.");
            }
          });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Fore elements are missing");
    }
  });

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      // replace content
      if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-Input");

        input.addEventListener("blur", function () {
          if (input.value.trim() === "") {
            input.value = currentValue;
          }
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}
