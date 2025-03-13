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
        
        // 创建轮播容器
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "video-carousel-container";
        carouselContainer.style.width = "100%";
        carouselContainer.style.height = "450px"; // 调整容器高度
        carouselContainer.style.backgroundColor = "rgba(232, 245, 233, 0.6)"; // 浅绿色背景带透明度
        carouselContainer.style.overflow = "visible"; // 允许内容溢出容器
        carouselContainer.style.position = "relative";
        carouselContainer.style.margin = "0 auto";
        carouselContainer.style.borderRadius = "8px"; // 圆角
        carouselContainer.style.padding = "20px";
        carouselContainer.style.boxSizing = "border-box";
        
        // 创建轮播轨道
        const carouselTrack = document.createElement("div");
        carouselTrack.className = "video-carousel-track";
        carouselTrack.style.display = "flex";
        carouselTrack.style.position = "absolute";
        carouselTrack.style.left = "0";
        carouselTrack.style.top = "0";
        carouselTrack.style.height = "100%";
        carouselTrack.style.padding = "20px";
        carouselTrack.style.boxSizing = "border-box";
        carouselTrack.style.transition = "transform 0.3s ease";
        carouselTrack.style.overflow = "visible"; // 允许内容溢出轨道
        
        // 创建视频项数组
        const videoItems = [];
        
        // 处理每个视频单元格
        videoCells.forEach((cell, index) => {
            // 创建视频项容器
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.flexShrink = "0";
            videoItem.style.width = "300px"; // 设置固定宽度
            videoItem.style.marginRight = "20px";
            videoItem.style.position = "relative";
            videoItem.style.overflow = "visible"; // 允许内容溢出
            
            // 获取视频元素
            const video = cell.querySelector("video");
            if (!video) {
                console.log("Video not found in cell", index);
                return;
            }
            
            // 创建视频包装器
            const videoWrapper = document.createElement("div");
            videoWrapper.style.width = "100%";
            videoWrapper.style.marginBottom = "10px";
            videoWrapper.style.borderRadius = "8px";
            videoWrapper.style.overflow = "hidden";
            videoWrapper.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            
            // 克隆视频元素
            const clonedVideo = video.cloneNode(true);
            clonedVideo.style.width = "100%";
            clonedVideo.style.height = "auto";
            clonedVideo.style.display = "block";
            
            // 将克隆的视频添加到包装器
            videoWrapper.appendChild(clonedVideo);
            
            // 获取折叠部分
            const collapsibleSection = cell.querySelector(".collapsible-section");
            if (!collapsibleSection) {
                console.log("Collapsible section not found in cell", index);
                videoItem.appendChild(videoWrapper);
                videoItems.push(videoItem);
                return;
            }
            
            // 创建折叠容器
            const collapsibleContainer = document.createElement("div");
            collapsibleContainer.className = "collapsible-container";
            collapsibleContainer.style.width = "100%";
            collapsibleContainer.style.position = "relative";
            
            // 获取按钮
            const button = collapsibleSection.querySelector("button").cloneNode(true);
            button.style.width = "100%";
            button.style.padding = "8px 12px";
            button.style.backgroundColor = "#f8f9fa";
            button.style.border = "1px solid #dee2e6";
            button.style.borderRadius = "4px";
            button.style.cursor = "pointer";
            button.style.display = "flex";
            button.style.justifyContent = "space-between";
            button.style.alignItems = "center";
            button.style.fontSize = "14px";
            button.style.position = "relative";
            button.style.zIndex = "1";
            
            // 获取内容容器ID
            const contentId = button.getAttribute("aria-controls");
            
            // 创建内容容器
            const contentContainer = document.createElement("div");
            contentContainer.id = contentId + "-" + index;
            contentContainer.className = "collapse-content";
            contentContainer.style.display = "none";
            contentContainer.style.position = "absolute";
            contentContainer.style.top = "100%";
            contentContainer.style.left = "0";
            contentContainer.style.zIndex = "1000";
            contentContainer.style.width = "300px";
            contentContainer.style.backgroundColor = "#ffffff"; // 纯白色背景
            contentContainer.style.border = "1px solid #dee2e6";
            contentContainer.style.borderRadius = "0 0 8px 8px";
            contentContainer.style.padding = "15px";
            contentContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            contentContainer.style.opacity = "1"; // 完全不透明
            
            // 获取内容
            const content = collapsibleSection.querySelector(".collapse-content");
            if (content) {
                // 克隆内容
                const clonedContent = content.cloneNode(true);
                
                // 修改表格样式
                const table = clonedContent.querySelector("table");
                if (table) {
                    table.style.width = "100%";
                    table.style.borderCollapse = "collapse";
                    
                    // 修改表格内的段落样式
                    const paragraphs = table.querySelectorAll("p");
                    paragraphs.forEach(p => {
                        p.style.margin = "0 0 10px 0";
                        p.style.lineHeight = "1.5";
                        p.style.fontSize = "14px";
                        p.style.color = "#333";
                    });
                }
                
                contentContainer.appendChild(clonedContent);
            }
            
            // 更新按钮的aria-controls属性
            button.setAttribute("aria-controls", contentId + "-" + index);
            
            // 添加按钮点击事件
            button.addEventListener("click", function() {
                // 切换内容显示状态
                const isVisible = contentContainer.style.display === "block";
                contentContainer.style.display = isVisible ? "none" : "block";
                
                // 更新图标
                const icon = this.querySelector(".fas");
                if (icon) {
                    if (isVisible) {
                        icon.classList.remove("fa-angle-up");
                        icon.classList.add("fa-angle-down");
                    } else {
                        icon.classList.remove("fa-angle-down");
                        icon.classList.add("fa-angle-up");
                    }
                }
                
                // 暂停/恢复轮播
                isPaused = !isVisible;
                if (isPaused) {
                    stopScroll();
                    carouselContainer.style.cursor = "default";
                } else {
                    startContinuousScroll();
                    carouselContainer.style.cursor = "grab";
                }
                
                // 阻止事件冒泡
                event.stopPropagation();
            });
            
            // 将按钮和内容添加到折叠容器
            collapsibleContainer.appendChild(button);
            collapsibleContainer.appendChild(contentContainer);
            
            // 将视频包装器和折叠容器添加到视频项
            videoItem.appendChild(videoWrapper);
            videoItem.appendChild(collapsibleContainer);
            
            // 将视频项添加到数组
            videoItems.push(videoItem);
        });
        
        // 复制视频项以实现无限滚动
        const clonedItems = videoItems.map(item => item.cloneNode(true));
        
        // 将所有视频项添加到轨道
        videoItems.forEach(item => carouselTrack.appendChild(item));
        clonedItems.forEach(item => carouselTrack.appendChild(item));
        
        // 将轨道添加到容器
        carouselContainer.appendChild(carouselTrack);
        
        // 替换原始表格
        videoContainer.innerHTML = "";
        videoContainer.appendChild(carouselContainer);
        
        // 计算原始轨道宽度
        const originalTrackWidth = videoItems.reduce((width, item) => {
            return width + item.offsetWidth + parseInt(getComputedStyle(item).marginRight);
        }, 0);
        
        // 设置滚动变量
        let scrollPosition = 0;
        let scrollInterval;
        let isDragging = false;
        let startX, scrollLeft;
        let isPaused = false;
        
        // 为克隆的按钮添加事件监听器
        clonedItems.forEach((item, index) => {
            const button = item.querySelector("button");
            if (button) {
                const contentId = button.getAttribute("aria-controls");
                const contentContainer = item.querySelector(".collapse-content");
                
                button.addEventListener("click", function() {
                    // 切换内容显示状态
                    const isVisible = contentContainer.style.display === "block";
                    contentContainer.style.display = isVisible ? "none" : "block";
                    
                    // 更新图标
                    const icon = this.querySelector(".fas");
                    if (icon) {
                        if (isVisible) {
                            icon.classList.remove("fa-angle-up");
                            icon.classList.add("fa-angle-down");
                        } else {
                            icon.classList.remove("fa-angle-down");
                            icon.classList.add("fa-angle-up");
                        }
                    }
                    
                    // 暂停/恢复轮播
                    isPaused = !isVisible;
                    if (isPaused) {
                        stopScroll();
                        carouselContainer.style.cursor = "default";
                    } else {
                        startContinuousScroll();
                        carouselContainer.style.cursor = "grab";
                    }
                    
                    // 阻止事件冒泡
                    event.stopPropagation();
                });
            }
        });
        
        // 连续滚动函数
        function startContinuousScroll() {
            // 清除现有的滚动间隔
            if (scrollInterval) {
                clearInterval(scrollInterval);
            }
            
            // 设置新的滚动间隔
            scrollInterval = setInterval(() => {
                scrollPosition += 1; // 每次滚动1像素
                
                // 当滚动到原始轨道宽度时重置位置
                if (scrollPosition >= originalTrackWidth) {
                    scrollPosition = 0;
                }
                
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }, 30); // 调整速度
        }
        
        // 停止滚动函数
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 添加拖动功能
        carouselContainer.addEventListener("mousedown", function(e) {
            if (isPaused) return; // 如果已暂停，不允许拖动
            
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = scrollPosition;
            carouselTrack.style.transition = "none";
            carouselContainer.style.cursor = "grabbing";
            stopScroll();
        });
        
        document.addEventListener("mousemove", function(e) {
            if (!isDragging) return;
            
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2; // 乘以2使拖动更敏感
            
            scrollPosition = scrollLeft - walk;
            
            // 处理边界情况
            if (scrollPosition < 0) {
                scrollPosition = originalTrackWidth + scrollPosition;
            } else if (scrollPosition >= originalTrackWidth) {
                scrollPosition = scrollPosition - originalTrackWidth;
            }
            
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        document.addEventListener("mouseup", function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = "transform 0.3s ease";
                carouselContainer.style.cursor = "grab";
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 点击内容外部时关闭所有折叠内容并恢复滚动
        document.addEventListener('click', function(e) {
            // 检查点击是否在按钮或内容区域外
            const isOutsideContent = !e.target.closest('.collapsible-container');
            
            if (isOutsideContent && isPaused) {
                // 关闭所有折叠内容
                const contents = carouselContainer.querySelectorAll('.collapse-content');
                contents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 更新所有图标
                const buttons = carouselContainer.querySelectorAll('button');
                buttons.forEach(button => {
                    const icon = button.querySelector('.fas');
                    if (icon) {
                        icon.classList.remove('fa-angle-up');
                        icon.classList.add('fa-angle-down');
                    }
                });
                
                isPaused = false;
                carouselContainer.style.cursor = "grab";
                startContinuousScroll();
                console.log("Clicked outside content, carousel resumed");
            }
        });
        
        // 防止拖动过程中失去鼠标焦点
        document.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = 'transform 0.3s ease';
                carouselContainer.style.cursor = 'grab';
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 鼠标悬停时暂停滚动
        carouselContainer.addEventListener("mouseenter", function() {
            if (!isPaused) {
                stopScroll();
            }
        });
        
        // 鼠标离开时恢复滚动
        carouselContainer.addEventListener("mouseleave", function() {
            if (!isDragging && !isPaused) {
                startContinuousScroll();
            }
        });
        
        // 启动连续滚动
        startContinuousScroll();
        
        console.log("Carousel initialized with original width:", originalTrackWidth, "px");
        console.log("Total track width:", originalTrackWidth * 2, "px");
        console.log("Number of items:", videoItems.length);
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