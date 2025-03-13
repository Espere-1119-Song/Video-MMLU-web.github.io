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
        carouselContainer.style.cursor = "grab"; // 显示抓取光标
        
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
        carouselTrack.style.transition = "transform 0.3s ease"; // 添加平滑过渡效果
        
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
        let scrollIntervalId = null;
        let isDragging = false;
        let startPosition = 0;
        let isPaused = false;
        
        function startContinuousScroll() {
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }
            
            scrollIntervalId = setInterval(function() {
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
        
        function stopScroll() {
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
                scrollIntervalId = null;
            }
        }
        
        // 鼠标拖动功能
        carouselContainer.addEventListener('mousedown', function(e) {
            if (isPaused) return; // 如果已暂停，不允许拖动
            
            isDragging = true;
            startPosition = position;
            let startX = e.clientX;
            carouselTrack.style.transition = 'none'; // 拖动时禁用过渡效果
            carouselContainer.style.cursor = 'grabbing'; // 更改光标为抓取中
            
            // 暂停自动滚动
            stopScroll();
            
            // 防止拖动时选中文本
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            position = startPosition + dx;
            
            // 应用新位置
            carouselTrack.style.transform = `translateX(${position}px)`;
        });
        
        document.addEventListener('mouseup', function() {
            if (!isDragging) return;
            
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.3s ease'; // 恢复过渡效果
            carouselContainer.style.cursor = 'grab'; // 恢复光标
            
            // 检查是否需要重置位置
            const itemWidthPx = carouselTrack.offsetWidth / totalItems;
            const resetPoint = -(itemWidthPx * allVideoCells.length);
            
            if (position <= resetPoint) {
                position = 0;
                carouselTrack.style.transform = `translateX(${position}px)`;
            } else if (position > 0) {
                position = resetPoint;
                carouselTrack.style.transform = `translateX(${position}px)`;
            }
            
            // 恢复自动滚动
            if (!isPaused) {
                startContinuousScroll();
            }
        });
        
        // 处理折叠部分的显示/隐藏
        function setupCollapsibleSections() {
            const allToggleButtons = carouselTrack.querySelectorAll('.toggle-section');
            
            allToggleButtons.forEach(button => {
                // 获取对应的折叠内容
                const targetId = button.getAttribute('aria-controls');
                const targetContent = carouselTrack.querySelector('#' + targetId);
                
                if (targetContent) {
                    // 初始状态为隐藏
                    targetContent.style.display = 'none';
                    
                    // 添加点击事件
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // 停止滚动
                        stopScroll();
                        isPaused = true;
                        
                        // 切换折叠内容的显示状态
                        if (targetContent.style.display === 'none') {
                            targetContent.style.display = 'block';
                            // 更改按钮图标
                            const icon = button.querySelector('.fa-angle-down');
                            if (icon) {
                                icon.classList.remove('fa-angle-down');
                                icon.classList.add('fa-angle-up');
                            }
                        } else {
                            targetContent.style.display = 'none';
                            // 更改按钮图标
                            const icon = button.querySelector('.fa-angle-up');
                            if (icon) {
                                icon.classList.remove('fa-angle-up');
                                icon.classList.add('fa-angle-down');
                            }
                        }
                        
                        // 更改容器光标样式
                        carouselContainer.style.cursor = "default";
                        
                        console.log("Toggle button clicked, content toggled, carousel paused");
                    });
                }
            });
        }
        
        // 设置折叠部分
        setupCollapsibleSections();
        
        // 点击其他地方恢复滚动
        document.addEventListener("click", function(e) {
            // 检查点击是否在按钮或折叠内容区域内
            let isClickInsideCarousel = carouselContainer.contains(e.target);
            let isClickInsideButton = false;
            let isClickInsideCollapsible = false;
            
            const allToggleButtons = carouselTrack.querySelectorAll('.toggle-section');
            allToggleButtons.forEach(button => {
                if (button.contains(e.target)) {
                    isClickInsideButton = true;
                }
            });
            
            const collapsibleSections = carouselTrack.querySelectorAll(".collapse-content");
            collapsibleSections.forEach(section => {
                if (section.contains(e.target)) {
                    isClickInsideCollapsible = true;
                }
            });
            
            // 如果点击在轮播内但不在按钮或折叠内容区域内，恢复滚动
            if (isClickInsideCarousel && !isClickInsideButton && !isClickInsideCollapsible && isPaused) {
                // 隐藏所有折叠内容
                collapsibleSections.forEach(section => {
                    section.style.display = 'none';
                });
                
                // 重置所有按钮图标
                allToggleButtons.forEach(button => {
                    const icon = button.querySelector('.fa-angle-up');
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