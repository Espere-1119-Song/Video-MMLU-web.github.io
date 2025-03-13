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
        
        // 创建轮播轨道 - 为了实现连续滚动，我们需要复制视频
        const carouselTrack = document.createElement("div");
        carouselTrack.className = "video-carousel-track";
        carouselTrack.style.display = "flex";
        carouselTrack.style.position = "absolute";
        carouselTrack.style.left = "0";
        carouselTrack.style.top = "0";
        carouselTrack.style.height = "100%";
        carouselTrack.style.padding = "20px";
        carouselTrack.style.boxSizing = "border-box";
        
        // 计算每个视频项的宽度 - 我们希望同时显示2-3个视频
        const itemsToShow = videoCells.length >= 3 ? 3 : 2; // 如果有3个或更多视频，显示3个，否则显示2个
        const itemWidth = 100 / itemsToShow; // 百分比宽度
        
        // 为了实现无缝滚动，我们需要复制视频
        const allVideoCells = [...videoCells];
        
        // 将每个视频单元格添加到轮播轨道
        allVideoCells.forEach(cell => {
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.flex = "0 0 auto";
            videoItem.style.padding = "10px";
            videoItem.style.boxSizing = "border-box";
            videoItem.style.width = itemWidth + "%";
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
        
        // 为了实现无缝滚动，再复制一组视频
        allVideoCells.forEach(cell => {
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.flex = "0 0 auto";
            videoItem.style.padding = "10px";
            videoItem.style.boxSizing = "border-box";
            videoItem.style.width = itemWidth + "%";
            videoItem.style.height = "100%";
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.justifyContent = "center";
            videoItem.style.alignItems = "center";
            
            videoItem.innerHTML = cell.innerHTML;
            
            const video = videoItem.querySelector("video");
            if (video) {
                video.style.maxHeight = "400px";
                video.style.width = "auto";
                video.style.margin = "0 auto";
                video.style.display = "block";
                video.style.objectFit = "contain";
            }
            
            const collapsibleSection = videoItem.querySelector(".collapsible-section");
            if (collapsibleSection) {
                collapsibleSection.style.width = "100%";
                collapsibleSection.style.marginTop = "10px";
            }
            
            carouselTrack.appendChild(videoItem);
        });
        
        // 设置轨道总宽度
        const totalItems = allVideoCells.length * 2; // 原始视频数量的两倍
        carouselTrack.style.width = (totalItems * itemWidth) + "%";
        
        // 将轨道添加到容器
        carouselContainer.appendChild(carouselTrack);
        
        // 用轮播替换表格
        existingTable.parentNode.replaceChild(carouselContainer, existingTable);
        
        console.log("Video carousel created with continuous scrolling");
        
        // 设置从右向左的连续滚动
        let position = 0;
        const scrollSpeed = 1; // 每次移动的像素数
        const scrollInterval = 30; // 滚动间隔（毫秒）
        
        function startContinuousScroll() {
            setInterval(function() {
                position -= scrollSpeed;
                
                // 当第一组视频完全滚出视图时，重置位置到开始
                const itemWidthPx = carouselTrack.offsetWidth / totalItems;
                const resetPoint = -(itemWidthPx * allVideoCells.length);
                
                if (position <= resetPoint) {
                    position = 0;
                }
                
                carouselTrack.style.transform = `translateX(${position}px)`;
            }, scrollInterval);
        }
        
        // 启动连续滚动
        startContinuousScroll();
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