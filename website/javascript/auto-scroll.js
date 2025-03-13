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
        
        // 创建轮播容器 - 添加浅绿色透明背景和可变高度
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "video-carousel-container";
        carouselContainer.style.width = "100%";
        carouselContainer.style.minHeight = "500px"; // 最小高度为500px，允许内容扩展
        carouselContainer.style.backgroundColor = "rgba(232, 245, 233, 0.6)"; // 浅绿色背景带透明度
        carouselContainer.style.overflow = "visible"; // 允许内容溢出
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
        carouselTrack.style.minHeight = "100%"; // 最小高度100%，允许内容扩展
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
            videoItem.style.minHeight = "100%"; // 最小高度100%，允许内容扩展
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.justifyContent = "flex-start"; // 从顶部开始对齐
            videoItem.style.alignItems = "center"; // 居中对齐内容
            
            // 克隆单元格内容
            videoItem.innerHTML = cell.innerHTML;
            
            // 创建视频容器，用于控制视频宽度
            const videoContainer = document.createElement("div");
            videoContainer.className = "video-wrapper";
            videoContainer.style.width = "100%";
            videoContainer.style.maxWidth = "600px"; // 设置最大宽度
            videoContainer.style.margin = "0 auto";
            videoContainer.style.position = "relative";
            
            // 获取视频元素
            const video = videoItem.querySelector("video");
            if (video) {
                // 从原位置移除视频
                video.parentNode.removeChild(video);
                
                // 设置视频样式
                video.style.maxHeight = "400px";
                video.style.width = "100%";
                video.style.display = "block";
                video.style.objectFit = "contain"; // 保持视频比例
                
                // 将视频添加到视频容器
                videoContainer.appendChild(video);
                
                // 将视频容器插入到视频项的开头
                if (videoItem.firstChild) {
                    videoItem.insertBefore(videoContainer, videoItem.firstChild);
                } else {
                    videoItem.appendChild(videoContainer);
                }
            }
            
            // 确保折叠部分在视频下方正确显示，并且宽度与视频一致
            const collapsibleSection = videoItem.querySelector(".collapsible-section");
            if (collapsibleSection) {
                // 从原位置移除折叠部分
                collapsibleSection.parentNode.removeChild(collapsibleSection);
                
                // 设置折叠部分样式
                collapsibleSection.style.width = "100%";
                collapsibleSection.style.maxWidth = "600px"; // 与视频容器相同的最大宽度
                collapsibleSection.style.marginTop = "10px";
                
                // 将折叠部分添加到视频容器后面
                videoContainer.parentNode.insertBefore(collapsibleSection, videoContainer.nextSibling);
                
                // 调整按钮宽度，使其与视频宽度一致
                const toggleButton = collapsibleSection.querySelector(".toggle-section");
                if (toggleButton) {
                    toggleButton.style.width = "100%";
                    toggleButton.style.maxWidth = "100%";
                }
                
                // 调整折叠内容宽度
                const collapseContent = collapsibleSection.querySelector(".collapse-content");
                if (collapseContent) {
                    collapseContent.style.width = "100%";
                    collapseContent.style.maxWidth = "100%";
                }
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
            videoItem.style.minHeight = "100%"; // 最小高度100%，允许内容扩展
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.justifyContent = "flex-start"; // 从顶部开始对齐
            videoItem.style.alignItems = "center";
            
            videoItem.innerHTML = cell.innerHTML;
            
            // 创建视频容器，用于控制视频宽度
            const videoContainer = document.createElement("div");
            videoContainer.className = "video-wrapper";
            videoContainer.style.width = "100%";
            videoContainer.style.maxWidth = "600px"; // 设置最大宽度
            videoContainer.style.margin = "0 auto";
            videoContainer.style.position = "relative";
            
            // 获取视频元素
            const video = videoItem.querySelector("video");
            if (video) {
                // 从原位置移除视频
                video.parentNode.removeChild(video);
                
                // 设置视频样式
                video.style.maxHeight = "400px";
                video.style.width = "100%";
                video.style.display = "block";
                video.style.objectFit = "contain"; // 保持视频比例
                
                // 将视频添加到视频容器
                videoContainer.appendChild(video);
                
                // 将视频容器插入到视频项的开头
                if (videoItem.firstChild) {
                    videoItem.insertBefore(videoContainer, videoItem.firstChild);
                } else {
                    videoItem.appendChild(videoContainer);
                }
            }
            
            // 确保折叠部分在视频下方正确显示，并且宽度与视频一致
            const collapsibleSection = videoItem.querySelector(".collapsible-section");
            if (collapsibleSection) {
                // 从原位置移除折叠部分
                collapsibleSection.parentNode.removeChild(collapsibleSection);
                
                // 设置折叠部分样式
                collapsibleSection.style.width = "100%";
                collapsibleSection.style.maxWidth = "600px"; // 与视频容器相同的最大宽度
                collapsibleSection.style.marginTop = "10px";
                
                // 将折叠部分添加到视频容器后面
                videoContainer.parentNode.insertBefore(collapsibleSection, videoContainer.nextSibling);
                
                // 调整按钮宽度，使其与视频宽度一致
                const toggleButton = collapsibleSection.querySelector(".toggle-section");
                if (toggleButton) {
                    toggleButton.style.width = "100%";
                    toggleButton.style.maxWidth = "100%";
                }
                
                // 调整折叠内容宽度
                const collapseContent = collapsibleSection.querySelector(".collapse-content");
                if (collapseContent) {
                    collapseContent.style.width = "100%";
                    collapseContent.style.maxWidth = "100%";
                }
            }
            
            carouselTrack.appendChild(videoItem);
        });
        
        // 添加轮播轨道到轮播容器
        carouselContainer.appendChild(carouselTrack);
        
        // 替换原始表格
        videoContainer.innerHTML = '';
        videoContainer.appendChild(carouselContainer);
        
        // 变量用于跟踪滚动状态
        let scrollIntervalId = null;
        let position = 0;
        const scrollSpeed = 1; // 每次移动的像素数
        const scrollInterval = 30; // 滚动间隔（毫秒）
        
        // 变量用于跟踪拖动状态
        let isDragging = false;
        let startX = 0;
        let startPosition = 0;
        
        // 变量用于跟踪暂停状态
        let isPaused = false;
        
        // 停止滚动函数
        function stopScroll() {
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
                scrollIntervalId = null;
            }
        }
        
        // 开始连续滚动函数
        function startContinuousScroll() {
            // 如果已经在滚动，先停止
            stopScroll();
            
            // 如果处于暂停状态，不启动滚动
            if (isPaused) {
                return;
            }
            
            // 启动新的滚动间隔
            scrollIntervalId = setInterval(() => {
                position -= scrollSpeed;
                
                // 计算重置点
                const totalItems = allVideoCells.length;
                const itemWidthPx = carouselTrack.offsetWidth / totalItems;
                const resetPoint = -(itemWidthPx * allVideoCells.length);
                
                if (position <= resetPoint) {
                    position = 0;
                }
                
                carouselTrack.style.transform = `translateX(${position}px)`;
            }, scrollInterval);
        }
        
        // 设置拖动事件
        carouselContainer.addEventListener('mousedown', function(e) {
            if (isPaused) return; // 如果处于暂停状态，不允许拖动
            
            isDragging = true;
            startX = e.clientX;
            startPosition = position;
            carouselTrack.style.transition = 'none';
            carouselContainer.style.cursor = 'grabbing';
            stopScroll();
            
            e.preventDefault(); // 防止选中文本
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const x = e.clientX;
            const diff = x - startX;
            position = startPosition + diff;
            
            carouselTrack.style.transform = `translateX(${position}px)`;
        });
        
        document.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.3s ease';
            carouselContainer.style.cursor = 'grab';
            
            // 计算边界
            const totalItems = allVideoCells.length;
            const itemWidthPx = carouselTrack.offsetWidth / totalItems;
            const resetPoint = -(itemWidthPx * allVideoCells.length);
            
            // 边界检查
            if (position > itemWidthPx / 2) {
                position = 0;
                carouselTrack.style.transform = `translateX(${position}px)`;
            } else if (position < resetPoint + itemWidthPx / 2) {
                position = resetPoint;
                carouselTrack.style.transform = `translateX(${position}px)`;
            }
            
            // 如果不处于暂停状态，恢复滚动
            if (!isPaused) {
                startContinuousScroll();
            }
        });
        
        // 设置折叠部分的功能
        function setupCollapsibleSections() {
            // 获取所有轮播项中的折叠按钮
            const allToggleButtons = carouselTrack.querySelectorAll('.toggle-section');
            
            allToggleButtons.forEach(button => {
                // 获取目标内容ID
                const targetId = button.getAttribute('aria-controls');
                if (targetId) {
                    // 查找目标内容
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        // 初始状态为隐藏
                        targetContent.style.display = 'none';
                        
                        // 添加点击事件
                        button.addEventListener('click', function(e) {
                            e.stopPropagation(); // 阻止事件冒泡
                            
                            // 停止滚动
                            stopScroll();
                            
                            // 切换内容显示状态
                            if (targetContent.style.display === 'none') {
                                // 显示内容
                                targetContent.style.display = 'block';
                                targetContent.style.zIndex = '100'; // 确保内容在最上层
                                
                                // 设置暂停状态
                                isPaused = true;
                                
                                // 调整容器高度以适应内容
                                const videoItem = button.closest('.video-carousel-item');
                                if (videoItem) {
                                    // 计算内容高度
                                    const contentHeight = targetContent.offsetHeight;
                                    const videoHeight = videoItem.querySelector('.video-wrapper').offsetHeight;
                                    const totalHeight = videoHeight + contentHeight + 100; // 额外空间
                                    
                                    // 设置最小高度
                                    carouselContainer.style.minHeight = totalHeight + 'px';
                                }
                                
                                // 更改按钮图标
                                const icon = button.querySelector('.fa-angle-down');
                                if (icon) {
                                    icon.classList.remove('fa-angle-down');
                                    icon.classList.add('fa-angle-up');
                                }
                            } else {
                                // 隐藏内容
                                targetContent.style.display = 'none';
                                
                                // 重置暂停状态
                                isPaused = false;
                                
                                // 重置轮播容器高度
                                carouselContainer.style.minHeight = '500px';
                                
                                // 更改按钮图标
                                const icon = button.querySelector('.fa-angle-up');
                                if (icon) {
                                    icon.classList.remove('fa-angle-up');
                                    icon.classList.add('fa-angle-down');
                                }
                                
                                // 恢复滚动
                                startContinuousScroll();
                            }
                            
                            // 更改容器光标样式
                            carouselContainer.style.cursor = targetContent.style.display === 'none' ? "grab" : "default";
                            
                            console.log("Toggle button clicked, content toggled, carousel " + (isPaused ? "paused" : "resumed"));
                        });
                    }
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
                
                // 重置轮播容器高度
                carouselContainer.style.minHeight = '500px';
                
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