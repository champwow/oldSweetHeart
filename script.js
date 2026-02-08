let currentPage = 1;
const totalPages = 4;
let audioPlayer = null;
let isMusicPlaying = false;
let messageIndex = 0;
let isAnimating = false;
let page3State = 0; // 0: initial text, 1: image, 2: text, 3: image, 4: text, ...
let page3Index = 0; // Index for images and texts
let page4MessageIndex = 0; // Index for page 4 messages

// Page 3 content arrays
const page3Images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "18_1.jpg",
    "19.jpg",
    "20.jpg",
];

const page3Texts = [
    "พี่หล่อไหมน้อง",
    "แหนะเขินอะดิพี่หล่อเกิน",
    "กล้องโฟกัสคนหลังแต่ทำไมมองเห็นแต่คนข้างหน้าอะ",
    "พี่สวยมั้ยน้อง",
    "ให้เดาจากสีหน้าครับ",
    "ทำสวยเพิ่มแปป",
    "แต่หิวอะขอกินก่อนนะ",
    "สวยขึ้นยังคะ?",
    "บาดใจเลยค่ะพี่ 5555",
    "แฟนน่ารักเกิน...ดูดน้ำแก้เขินหน่อย",
    "น่ารักไม่ไหวไม่รู้จะโพสท่าไหนเอา👍ไปละกัน",
    "ตอนนี้ยังงงอยู่นะคนน่ารักขนาดนี้มาจีบแชมป์ก่อนได้ยังไงดูหน้าแชมป์ดิ55555555555",
    "โอ้ยไม่ไหวแล้วเกร็งอะไรขนาดนั้นอะะะ",
    "ติดแฟนเกินนะอันนี้",
    "ยิ้มกระชากใจจจจ5555555555",
    "นี่มีจับหงจับหัวนะไอ้นี่มันร้ายย",
    "อันนี้น้องก่อนจะโดนซื้อตัวออกจากบ้านเก่า",
    "อันนี้น้องตอนไปอยู่กับแม่ใหม่",
    "คนนึงหน้ายิ้มคนนึงหน้าบึ้งง 5555",
    "หลายปีผ่านไปน้องยังดูสวยเหมือนเดิมนะ อันนี้แชมป์ไม่คิดว่าเชียร์จะเก็บมันไว้ดีขนาดนี้จริงๆขอบคุณนะะ",
    "ส่วนอันนี้คงเป็นช่วงท้ายๆแล้วที่เรายังอยู่ด้วยกันตอนนั้น",
];
const page4Messages = [
    "รูปเก่าๆแชมป์พยายามหามาได้เท่านี้แหละ",
    "ขอโทษนะ",
    "ที่เมื่อก่อนแชมป์ทำอะไรให้เชียร์ไม่สบายใจ",
    "จนเชียร์ต้องเป็นฝ่ายออกไป",
    "เมื่อก่อนเราเป็นคู่ที่ราบรื่นจริงๆ",
    "แชมป์ชอบตอนที่เราเป็นแฟนกันมากๆจริงๆนะ",
    "แล้วก็",
    "ขอบคุณนะที่ให้โอกาสแชมป์มาจีบเชียร์อีกรอบ",
    "ครั้งนี่จะเป็นฝ่ายจีบบ้างละ",
    "เตรียมตัวรับมือนะ5555",
    "ที่บอกว่าเชียร์เป็นแฟนคนแรกที่แชมป์คิดถึงเรื่องอานาคตด้วยอันนี้ไม่ได้โม้นะ",
    "เพราะงั้นแชมป์จะพยายามจีบนะคับบ",
    "อยากให้แฟนเก่าคนนี้มาเป็นแฟนใหม่นะ",
    "สุดท้ายนี้",
    "แชมป์รู้ว่าเชียร์คงมีเรื่องเครียดเยอะ",
    "แชมป์เป็นกำลังใจให้นะ",
    "เรื่องร้ายๆที่ผ่านมาก็ทิ้งมันไว้ข้างหลัง",
    "เชียร์เป็นคนเก่งในสายตาแชมป์เสมอ",
    "ใช้ชีวิตให้มีความสุขนะคับ",
    "Happy valentine's day na kub 💕",
];

// Messages for page 2
const messages = [
    "งงมั้ยว่าอันนี้คืออะไร",
    "ก็วันนี้เป็นวาเลนไทน์แรกของแชมป์กับเชียร์",
    "แต่วันนี้แชมป์ต้องทำงาน",
    "แล้วก็คงยังไม่ได้เจอกัน",
    "แชมป์ก็เลยขอเอาหน้าที่การงานมาใช้ประโยชน์หน่อย 555",
    "แหนะแอบยิ้มรู้นะ",
    "พร้อมยัง",
    "พร้อมจริงๆนะ",
    "พร้อมแน่นะ",
    "ไม่ยั่วนะ",
    "ไม่แกล้งและๆ",
    "ค่อยๆกดนะห้ามรีบ!!",
    "ป้ะะ💕"
];

// Initialize audio player
window.addEventListener('DOMContentLoaded', () => {
    audioPlayer = document.getElementById('background-music');
    // Reset message index when page loads
    if (currentPage === 2) {
        messageIndex = 0;
    }
});

function playMusic() {
    if (!isMusicPlaying && audioPlayer) {
        audioPlayer.play().catch(error => {
            console.log('Auto-play was prevented:', error);
        });
        isMusicPlaying = true;
    }
}

function stopMusic() {
    if (isMusicPlaying && audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isMusicPlaying = false;
    }
}

function nextMessage() {
    if (currentPage !== 2 && currentPage !== 4) return;
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    const messageContent = document.getElementById(currentPage === 2 ? 'message-content' : 'page4-content');
    if (!messageContent) return;
    
    // Create cute animations on click
    createBouncingHeart();
    createRotatingSparkle();
    if (Math.random() > 0.7) {
        createConfetti();
    }
    
    isAnimating = true;
    
    // Remove all animation classes first
    messageContent.classList.remove('fade-in', 'fade-out', 'bounce', 'fade-in-bounce');
    
    // Force reflow to reset animation
    requestAnimationFrame(() => {
        // Add fade out animation
        messageContent.classList.add('fade-out');
        
        setTimeout(() => {
        // Move to next message
        const messageArray = currentPage === 4 ? page4Messages : messages;
        const currentMessageIndex = currentPage === 4 ? page4MessageIndex : messageIndex;
        
        if (currentPage === 4) {
            page4MessageIndex++;
            // Don't loop back, we'll handle the last message separately
            if (page4MessageIndex >= page4Messages.length) {
                page4MessageIndex = page4Messages.length - 1; // Stay at last message
            }
        } else {
            messageIndex++;
            if (messageIndex >= messages.length) {
                messageIndex = 0; // Loop back to first message
            }
        }
        
        const newIndex = currentPage === 4 ? page4MessageIndex : messageIndex;
        let messageText = messageArray[newIndex];
        
        // Check if this is the last message
        if (newIndex === messageArray.length - 1) {
            // Last message already has heart emoji
        } else if (newIndex === 0 || newIndex === 1 || newIndex === 4) {
            messageText = messageText + ' 💕';
        }
            
            // Remove all classes before updating content
            messageContent.classList.remove('fade-in', 'fade-out', 'bounce', 'fade-in-bounce');
            
            // Update message text
            messageContent.innerHTML = `<p class="text-2xl md:text-3xl font-semibold text-pink-600 leading-relaxed">${messageText}</p>`;
            
            // Force reflow to reset animation
            requestAnimationFrame(() => {
                // Add combined fade-in-bounce animation
                messageContent.classList.add('fade-in-bounce');
                
                // Check if this is the last message
                if (currentPage === 2 && messageIndex === messages.length - 1) {
                    // After last message, transition to page 3 with heart animation
                    setTimeout(() => {
                        messageContent.classList.remove('fade-in-bounce');
                        isAnimating = false;
                        // Create floating hearts animation
                        createFloatingHearts();
                        // Transition to page 3 after hearts animation
                        setTimeout(() => {
                            goToPage3();
                        }, 1000);
                    }, 800);
                } else if (currentPage === 4 && newIndex === page4Messages.length - 1) {
                    // After last message in page 4, show restart button
                    setTimeout(() => {
                        messageContent.classList.remove('fade-in-bounce');
                        isAnimating = false;
                        showRestartButton();
                    }, 800);
                } else {
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        messageContent.classList.remove('fade-in-bounce');
                        isAnimating = false;
                    }, 800);
                }
            });
        }, 400);
    });
}

// Function to initialize first message when page 2 or 4 is shown
function initPage2Message() {
    if (currentPage === 2 || currentPage === 4) {
        const messageContent = document.getElementById(currentPage === 2 ? 'message-content' : 'page4-content');
        const messageArray = currentPage === 4 ? page4Messages : messages;
        const currentMessageIndex = currentPage === 4 ? page4MessageIndex : messageIndex;
        
        if (messageContent && currentMessageIndex === 0 && messageArray.length > 0) {
            // Remove all animation classes
            messageContent.classList.remove('fade-in', 'fade-out', 'bounce', 'fade-in-bounce');
            // Force reflow
            requestAnimationFrame(() => {
                // Update content
                messageContent.innerHTML = `<p class="text-2xl md:text-3xl font-semibold text-pink-600 leading-relaxed">${messageArray[0]} 💕</p>`;
                // Add fade-in animation
                requestAnimationFrame(() => {
                    messageContent.classList.add('fade-in');
                    // Reset animation flag after animation
                    setTimeout(() => {
                        messageContent.classList.remove('fade-in');
                        isAnimating = false;
                    }, 600);
                });
            });
        }
    }
}

// Function to show restart button
function showRestartButton() {
    const messageContent = document.getElementById('page4-content');
    const messageContainer = messageContent?.closest('.message-container');
    
    if (messageContainer) {
        messageContainer.onclick = null; // Remove click handler
        messageContainer.style.cursor = 'default';
        
        // Create celebration animations
        createConfetti();
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
                createBouncingHeart();
            }, i * 100);
        }
        
        // Add restart button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'text-center mt-8';
        buttonContainer.innerHTML = `
            <button onclick="restart()" class="btn-next bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                เล่นใหม่ 🔄
            </button>
        `;
        
        messageContainer.appendChild(buttonContainer);
        
        // Animate button appearance
        requestAnimationFrame(() => {
            buttonContainer.style.opacity = '0';
            buttonContainer.style.transform = 'translateY(20px) scale(0.8)';
            buttonContainer.style.transition = 'all 0.6s ease-out';
            requestAnimationFrame(() => {
                buttonContainer.style.opacity = '1';
                buttonContainer.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Function to restart (go back to page 1 but keep music playing)
function restart() {
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Reset all states
    currentPage = 1;
    messageIndex = 0;
    page4MessageIndex = 0;
    page3State = 0;
    page3Index = 0;
    isAnimating = false;
    
    // Show page 1
    const page1Element = document.getElementById('page1');
    if (page1Element) {
        page1Element.classList.add('active');
    }
    
    // Reset page 4 container
    const page4Container = document.querySelector('#page4 .message-container');
    if (page4Container) {
        page4Container.onclick = nextMessage;
        page4Container.style.cursor = 'pointer';
        // Remove restart button if exists
        const buttonContainer = page4Container.querySelector('.text-center.mt-8');
        if (buttonContainer) {
            buttonContainer.remove();
        }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Music continues playing (don't call stopMusic())
}

function nextPage() {
    const currentPageElement = document.getElementById(`page${currentPage}`);
    currentPageElement.classList.remove('active');
    
    // Create cute animations on page change
    createFloatingHeart();
    createTwinklingStar();
    if (Math.random() > 0.5) {
        createBouncingHeart();
    }
    
    // Add fade out animation
    currentPageElement.style.animation = 'fadeOut 0.4s ease-in-out';
    
    setTimeout(() => {
        currentPage++;
        if (currentPage > totalPages) {
            currentPage = 1; // Loop back to first page
            // Only stop music if not coming from page 4
            if (currentPage !== 4) {
                stopMusic(); // Stop music when going back to page 1
            }
        } else if (currentPage >= 2) {
            // Reset message index when entering page 2
            if (currentPage === 2) {
                messageIndex = 0;
            }
            // Start music from page 2 onwards
            setTimeout(() => {
                playMusic();
            }, 500);
        }
        
        const nextPageElement = document.getElementById(`page${currentPage}`);
        nextPageElement.classList.add('active');
        
        // Initialize page 2 message if needed
        if (currentPage === 2) {
            messageIndex = 0;
            setTimeout(() => {
                initPage2Message();
            }, 100);
        }
        
        // Initialize page 3 if needed
        if (currentPage === 3) {
            setTimeout(() => {
                initPage3();
            }, 100);
        }
        
        // Initialize page 4 message if needed
        if (currentPage === 4) {
            page4MessageIndex = 0;
            setTimeout(() => {
                initPage2Message();
            }, 100);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

// Add sparkle effects
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Create floating hearts
function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💞', '💟', '❤️', '🧡', '💛'];
    const heart = document.createElement('div');
    heart.className = 'float-up';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Create bouncing hearts
function createBouncingHeart() {
    const hearts = ['💕', '💖', '💗', '💓'];
    const heart = document.createElement('div');
    heart.className = 'heart-bounce';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 90 + 5 + '%';
    heart.style.top = Math.random() * 80 + 10 + '%';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Create twinkling stars
function createTwinklingStar() {
    const stars = ['⭐', '✨', '🌟', '💫'];
    const star = document.createElement('div');
    star.className = 'star-twinkle';
    star.textContent = stars[Math.floor(Math.random() * stars.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Create confetti
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = (Math.random() * 8 + 5) + 'px';
            confetti.style.height = (Math.random() * 8 + 5) + 'px';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Create rotating sparkles
function createRotatingSparkle() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-rotate';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Create sparkles periodically
setInterval(createSparkle, 1000);
// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);
// Create bouncing hearts periodically
setInterval(createBouncingHeart, 3000);
// Create twinkling stars periodically
setInterval(createTwinklingStar, 2500);
// Create rotating sparkles periodically
setInterval(createRotatingSparkle, 1800);

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next page
        nextPage();
    }
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartCount = 15;
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💞', '💟'];
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.animationDelay = (i * 0.1) + 's';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
}

// Go to page 4 with transition
function goToPage4() {
    // Reset animation flag
    isAnimating = false;
    
    const currentPageElement = document.getElementById(`page${currentPage}`);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    currentPage = 4;
    page4MessageIndex = 0;
    
    const nextPageElement = document.getElementById(`page${currentPage}`);
    if (nextPageElement) {
        nextPageElement.classList.add('active');
    }
    
    // Initialize page 4
    setTimeout(() => {
        initPage2Message();
    }, 100);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go to page 3 with transition
function goToPage3() {
    const currentPageElement = document.getElementById(`page${currentPage}`);
    currentPageElement.classList.remove('active');
    
    currentPage = 3;
    page3State = 0;
    
    const nextPageElement = document.getElementById(`page${currentPage}`);
    nextPageElement.classList.add('active');
    
    // Initialize page 3
    initPage3();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize page 3
function initPage3() {
    const page3Content = document.getElementById('page3-content');
    const page3Image = document.getElementById('page3-image');
    const page3Text = document.getElementById('page3-text');
    
    if (page3Content) {
        page3Content.innerHTML = '<p class="text-2xl md:text-3xl font-semibold text-pink-600 leading-relaxed">แชมป์มีอะไรให้ดู</p>';
        page3Content.style.display = 'block';
        page3Content.classList.remove('fade-in', 'fade-out', 'bounce', 'fade-in-bounce');
        requestAnimationFrame(() => {
            page3Content.classList.add('fade-in');
        });
    }
    
    if (page3Image) {
        page3Image.classList.remove('show');
        page3Image.style.display = 'none';
    }
    
    if (page3Text) {
        page3Text.classList.remove('show');
        page3Text.style.display = 'none';
    }
    
    page3State = 0;
    page3Index = 0;
}

// Handle page 3 click
function nextPage3() {
    if (currentPage !== 3) return;
    if (isAnimating) return;
    
    isAnimating = true;
    const page3Content = document.getElementById('page3-content');
    const page3Image = document.getElementById('page3-image');
    const page3Text = document.getElementById('page3-text');
    
    if (page3State === 0) {
        // Show first image
        if (page3Content) {
            page3Content.classList.remove('fade-in');
            page3Content.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (page3Content) {
                page3Content.style.display = 'none';
            }
            if (page3Image && page3Images.length > 0) {
                page3Image.src = page3Images[0];
                page3Image.style.display = 'block';
                page3Image.classList.remove('show');
                requestAnimationFrame(() => {
                    page3Image.classList.add('show');
                });
            }
            page3State = 1;
            page3Index = 0;
            isAnimating = false;
        }, 400);
    } else if (page3State === 1) {
        // Show text below image
        if (page3Text && page3Texts.length > page3Index) {
            page3Text.innerHTML = `<p class="text-lg md:text-xl text-gray-700 leading-relaxed">${page3Texts[page3Index]}</p>`;
            page3Text.style.display = 'block';
            page3Text.classList.remove('show');
            requestAnimationFrame(() => {
                page3Text.classList.add('show');
            });
        }
        page3State = 2;
        isAnimating = false;
    } else if (page3State === 2) {
        // Hide text and show next image
        if (page3Text) {
            page3Text.classList.remove('show');
            page3Text.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (page3Text) {
                page3Text.style.display = 'none';
                page3Text.classList.remove('fade-out');
            }
            
            page3Index++;
            if (page3Index < page3Images.length) {
                // Show next image
                if (page3Image) {
                    page3Image.classList.remove('show');
                    page3Image.classList.add('fade-out');
                }
                
                setTimeout(() => {
                    if (page3Image) {
                        page3Image.src = page3Images[page3Index];
                        page3Image.classList.remove('fade-out');
                        requestAnimationFrame(() => {
                            page3Image.classList.add('show');
                        });
                    }
                    page3State = 1;
                    isAnimating = false;
                }, 400);
            } else {
                // No more images, go to page 4
                setTimeout(() => {
                    goToPage4();
                }, 500);
            }
        }, 400);
    }
}
