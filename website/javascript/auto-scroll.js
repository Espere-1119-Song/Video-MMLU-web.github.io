document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize auto-scrolling for tables
    function initTableAutoScroll() {
        // Get the table element
        const tableEl = document.getElementById("behavior-benchmark-main-table");
        if (!tableEl) {
            console.log("Table element not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        const tableWrapper = tableEl.querySelector(".tabulator-tableholder");
        if (!tableWrapper) {
            console.log("Table wrapper not found, retrying in 500ms");
            setTimeout(initTableAutoScroll, 500);
            return;
        }
        
        console.log("Auto-scroll initialized for table");
        
        // Variables for auto-scrolling
        let scrollAmount = 0;
        const scrollSpeed = 1; // Pixels per interval
        let scrollInterval;
        let scrollDirection = 1; // 1 for right, -1 for left
        let maxScroll;
        
        // Start auto-scrolling
        function startAutoScroll() {
            scrollInterval = setInterval(function() {
                maxScroll = tableWrapper.scrollWidth - tableWrapper.clientWidth;
                
                // Only scroll if there's content to scroll
                if (maxScroll <= 0) return;
                
                // Update scroll position
                scrollAmount += (scrollSpeed * scrollDirection);
                
                // Change direction when reaching the end
                if (scrollAmount >= maxScroll) {
                    scrollDirection = -1;
                } else if (scrollAmount <= 0) {
                    scrollDirection = 1;
                }
                
                // Apply scroll
                tableWrapper.scrollLeft = scrollAmount;
            }, 30); // Adjust interval for smoother/faster scrolling
        }
        
        // Pause scrolling when hovering
        tableWrapper.addEventListener("mouseenter", function() {
            clearInterval(scrollInterval);
        });
        
        // Resume scrolling when mouse leaves
        tableWrapper.addEventListener("mouseleave", function() {
            startAutoScroll();
        });
        
        // Start scrolling initially
        startAutoScroll();
    }
    
    // Function to create a horizontal scrolling video carousel
    function createVideoCarousel() {
        // 只选择带有 carousel-enabled 类的视频容器
        const videoContainer = document.querySelector(".video-container.carousel-enabled");
        if (!videoContainer) {
            console.log("Carousel-enabled video container not found");
            return;
        }
        
        // 获取现有表格
        const existingTable = videoContainer.querySelector("table");
        if (!existingTable) {
            console.log("Video table not found");
            return;
        }
        
        // 获取所有视频单元格
        const videoCells = existingTable.querySelectorAll("td");
        if (!videoCells.length) {
            console.log("No video cells found");
            return;
        }
        
        // 创建轮播容器 - 添加浅绿色透明背景和固定高度
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "video-carousel-container";
        carouselContainer.style.width = "100%";
        carouselContainer.style.height = "500px"; // 固定高度为500px
        carouselContainer.style.backgroundColor = "rgba(232, 245, 233, 0.6)"; // 浅绿色背景带透明度
        carouselContainer.style.overflow = "hidden";
        carouselContainer.style.position = "relative";
        carouselContainer.style.margin = "0 auto";
        carouselContainer.style.borderRadius = "8px"; // 圆角
        carouselContainer.style.padding = "20px";
        carouselContainer.style.boxSizing = "border-box";
        carouselContainer.style.border = "none"; // 确保没有边框
        
        // 创建轮播轨道
        const carouselTrack = document.createElement("div");
        carouselTrack.className = "video-carousel-track";
        carouselTrack.style.display = "flex";
        carouselTrack.style.transition = "transform 0.5s ease";
        carouselTrack.style.width = (videoCells.length * 100) + "%"; // 足够容纳所有视频
        carouselTrack.style.height = "100%";
        
        // 将每个视频单元格添加到轮播轨道
        videoCells.forEach(cell => {
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.flex = "1 0 auto";
            videoItem.style.padding = "10px";
            videoItem.style.boxSizing = "border-box";
            videoItem.style.width = (100 / videoCells.length) + "%";
            videoItem.style.height = "100%";
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.justifyContent = "center";
            videoItem.style.alignItems = "center"; // 居中对齐内容
            
            // 克隆单元格内容
            videoItem.innerHTML = cell.innerHTML;
            
            // 确保视频高度不超过400px
            const video = videoItem.querySelector("video");
            if (video) {
                video.style.maxHeight = "400px";
                video.style.width = "auto";
                video.style.margin = "0 auto";
                video.style.display = "block";
                video.style.objectFit = "contain"; // 保持视频比例
            }
            
            // 确保折叠部分在视频下方正确显示
            const collapsibleSection = videoItem.querySelector(".collapsible-section");
            if (collapsibleSection) {
                collapsibleSection.style.width = "100%";
                collapsibleSection.style.marginTop = "10px";
            }
            
            carouselTrack.appendChild(videoItem);
        });
        
        // 将轨道添加到容器
        carouselContainer.appendChild(carouselTrack);
        
        // 用轮播替换表格
        existingTable.parentNode.replaceChild(carouselContainer, existingTable);
        
        console.log("Video carousel created");
        
        // 设置自动滚动
        let currentPosition = 0;
        const totalItems = videoCells.length;
        const scrollSpeed = 3000; // 每个视频显示时间（毫秒）
        let scrollInterval;
        
        function startAutoScroll() {
            scrollInterval = setInterval(function() {
                currentPosition = (currentPosition + 1) % totalItems;
                carouselTrack.style.transform = `translateX(-${(currentPosition * 100) / totalItems}%)`;
            }, scrollSpeed);
        }
        
        // 添加导航按钮
        const prevButton = document.createElement("button");
        prevButton.innerHTML = "&#10094;"; // 左箭头
        prevButton.className = "carousel-nav-button prev";
        prevButton.style.position = "absolute";
        prevButton.style.top = "50%";
        prevButton.style.left = "10px";
        prevButton.style.transform = "translateY(-50%)";
        prevButton.style.zIndex = "10";
        prevButton.style.backgroundColor = "rgba(255,255,255,0.7)";
        prevButton.style.border = "none";
        prevButton.style.borderRadius = "50%";
        prevButton.style.width = "40px";
        prevButton.style.height = "40px";
        prevButton.style.fontSize = "18px";
        prevButton.style.cursor = "pointer";
        
        const nextButton = document.createElement("button");
        nextButton.innerHTML = "&#10095;"; // 右箭头
        nextButton.className = "carousel-nav-button next";
        nextButton.style.position = "absolute";
        nextButton.style.top = "50%";
        nextButton.style.right = "10px";
        nextButton.style.transform = "translateY(-50%)";
        nextButton.style.zIndex = "10";
        nextButton.style.backgroundColor = "rgba(255,255,255,0.7)";
        nextButton.style.border = "none";
        nextButton.style.borderRadius = "50%";
        nextButton.style.width = "40px";
        nextButton.style.height = "40px";
        nextButton.style.fontSize = "18px";
        nextButton.style.cursor = "pointer";
        
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
        
        prevButton.addEventListener("click", function() {
            currentPosition = (currentPosition - 1 + totalItems) % totalItems;
            carouselTrack.style.transform = `translateX(-${(currentPosition * 100) / totalItems}%)`;
            clearInterval(scrollInterval);
            startAutoScroll();
        });
        
        nextButton.addEventListener("click", function() {
            currentPosition = (currentPosition + 1) % totalItems;
            carouselTrack.style.transform = `translateX(-${(currentPosition * 100) / totalItems}%)`;
            clearInterval(scrollInterval);
            startAutoScroll();
        });
        
        // 添加指示器点
        const indicatorContainer = document.createElement("div");
        indicatorContainer.className = "carousel-indicators";
        indicatorContainer.style.position = "absolute";
        indicatorContainer.style.bottom = "10px";
        indicatorContainer.style.left = "50%";
        indicatorContainer.style.transform = "translateX(-50%)";
        indicatorContainer.style.display = "flex";
        indicatorContainer.style.gap = "8px";
        
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement("div");
            dot.className = "carousel-indicator-dot";
            dot.style.width = "10px";
            dot.style.height = "10px";
            dot.style.borderRadius = "50%";
            dot.style.backgroundColor = i === 0 ? "#4CAF50" : "rgba(255,255,255,0.7)";
            dot.style.cursor = "pointer";
            
            dot.addEventListener("click", function() {
                currentPosition = i;
                carouselTrack.style.transform = `translateX(-${(currentPosition * 100) / totalItems}%)`;
                // 更新所有点的颜色
                indicatorContainer.querySelectorAll(".carousel-indicator-dot").forEach((d, index) => {
                    d.style.backgroundColor = index === i ? "#4CAF50" : "rgba(255,255,255,0.7)";
                });
                clearInterval(scrollInterval);
                startAutoScroll();
            });
            
            indicatorContainer.appendChild(dot);
        }
        
        carouselContainer.appendChild(indicatorContainer);
        
        // 更新指示器点的颜色
        function updateIndicators() {
            indicatorContainer.querySelectorAll(".carousel-indicator-dot").forEach((dot, index) => {
                dot.style.backgroundColor = index === currentPosition ? "#4CAF50" : "rgba(255,255,255,0.7)";
            });
        }
        
        // 鼠标悬停时暂停滚动
        carouselContainer.addEventListener("mouseenter", function() {
            clearInterval(scrollInterval);
        });
        
        // 鼠标离开时恢复滚动
        carouselContainer.addEventListener("mouseleave", function() {
            startAutoScroll();
        });
        
        // 修改自动滚动函数以更新指示器
        function startAutoScroll() {
            scrollInterval = setInterval(function() {
                currentPosition = (currentPosition + 1) % totalItems;
                carouselTrack.style.transform = `translateX(-${(currentPosition * 100) / totalItems}%)`;
                updateIndicators();
            }, scrollSpeed);
        }
        
        // 初始启动滚动
        startAutoScroll();
    }
    
    // Initialize both scrolling features
    setTimeout(function() {
        initTableAutoScroll();
        createVideoCarousel();
    }, 1500);
    
    // Also try to initialize when the tab becomes active
    document.getElementById('main-results-tab').addEventListener('shown.bs.tab', function() {
        setTimeout(initTableAutoScroll, 500);
    });
}); 