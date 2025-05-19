
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');
    const messageList = document.getElementById('message-list');
    const messageTableBody = document.getElementById('message-table-body');
    const toggleListBtn = document.getElementById('toggle-list');
    
    // Initialize messages array - in a real app, this would be stored in a database
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    // Display messages when page loads
    displayMessages();
    
    // Show message list for CRUD demo
    setTimeout(() => {
      messageList.style.display = 'block';
    }, 500);
    
    // Toggle message list visibility
    toggleListBtn.addEventListener('click', () => {
      const isVisible = messageTableBody.style.display !== 'none';
      messageTableBody.style.display = isVisible ? 'none' : 'table-row-group';
      toggleListBtn.textContent = isVisible ? 'Show Messages' : 'Hide Messages';
    });
    
    // Form submission event handler
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Hide any existing alerts
      successAlert.style.display = 'none';
      errorAlert.style.display = 'none';
      
      try {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create message object with unique ID
        const messageData = {
          id: Date.now().toString(),
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message,
          timestamp: new Date().toISOString()
        };
        
        // Add to messages array (CREATE)
        messages.push(messageData);
        
        // Save to localStorage
        saveMessages();
        
        // Display updated messages
        displayMessages();
        
        // Show success message
        successAlert.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Make sure the message list is visible after submission
        messageList.style.display = 'block';
        messageTableBody.style.display = 'table-row-group';
        toggleListBtn.textContent = 'Hide Messages';
        
        // Scroll to message list
        setTimeout(() => {
          messageList.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } catch (error) {
        console.error('Error submitting form:', error);
        errorAlert.style.display = 'block';
      }
    });
    
    // Display messages in the table
    function displayMessages() {
      // Clear existing rows
      messageTableBody.innerHTML = '';
      
      // Add message rows
      messages.forEach(msg => {
        const row = document.createElement('tr');
        
        // Truncate long text for display
        const truncateText = (text, maxLength = 30) => {
          return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        };
        
        row.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.subject}</td>
          <td>${truncateText(msg.message)}</td>
          <td>
            <button class="action-btn edit-btn" data-id="${msg.id}">✏️</button>
            <button class="action-btn delete-btn" data-id="${msg.id}">🗑️</button>
          </td>
        `;
        
        messageTableBody.appendChild(row);
      });
      
      // Add event listeners to edit and delete buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', editMessage);
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteMessage);
      });
    }
    
    // Edit message (UPDATE)
    function editMessage(event) {
      const messageId = event.target.getAttribute('data-id');
      const message = messages.find(msg => msg.id === messageId);
      
      if (message) {
        // Fill form with message data
        document.getElementById('name').value = message.name;
        document.getElementById('email').value = message.email;
        document.getElementById('phone').value = message.phone || '';
        document.getElementById('subject').value = message.subject;
        document.getElementById('message').value = message.message;
        
        // Change form submit button to update
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.textContent = 'Update Message';
        submitBtn.setAttribute('data-edit-id', messageId);
        
        // Scroll to form
        document.querySelector('.contact-form').scrollIntoView({ behavior: 'smooth' });
        
        // Modify form submission for update
        contactForm.onsubmit = function(e) {
          e.preventDefault();
          
          // Update message data
          const updatedMessage = {
            ...message,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            updated: new Date().toISOString()
          };
          
          // Find index of message to update
          const index = messages.findIndex(msg => msg.id === messageId);
          
          // Update message in array
          if (index !== -1) {
            messages[index] = updatedMessage;
          }
          
          // Save and display updated messages
          saveMessages();
          displayMessages();
          
          // Show success message
          successAlert.textContent = 'Message updated successfully!';
          successAlert.style.display = 'block';
          
          // Reset form and button
          contactForm.reset();
          submitBtn.textContent = 'Send Message';
          submitBtn.removeAttribute('data-edit-id');
          
          // Restore original submit handler
          contactForm.onsubmit = null;
          contactForm.addEventListener('submit', arguments.callee.caller);
          
          // Scroll to message list
          setTimeout(() => {
            messageList.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        };
      }
    }
    
    // Delete message (DELETE)
    function deleteMessage(event) {
      if (confirm('Are you sure you want to delete this message?')) {
        const messageId = event.target.getAttribute('data-id');
        
        // Filter out the message with the given ID
        messages = messages.filter(msg => msg.id !== messageId);
        
        // Save and display updated messages
        saveMessages();
        displayMessages();
      }
    }
    
    // Save messages to localStorage
    function saveMessages() {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
