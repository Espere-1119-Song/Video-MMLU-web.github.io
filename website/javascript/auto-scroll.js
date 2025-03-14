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
        
        // 创建轮播容器 - 保持浅绿色透明背景和固定高度
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
        carouselContainer.style.border = "none"; // 确保没有边框
        carouselContainer.style.cursor = "grab"; // 显示抓取光标
        
        // 创建一个容器来包含轮播和展开的内容
        const carouselAndContentContainer = document.createElement("div");
        carouselAndContentContainer.className = "carousel-and-content-container";
        carouselAndContentContainer.style.position = "relative";
        carouselAndContentContainer.style.width = "100%";
        carouselAndContentContainer.style.marginBottom = "20px"; // 底部间距
        
        // 创建轮播轨道 - 为了实现连续滚动，我们需要复制视频
        const carouselTrack = document.createElement("div");
        carouselTrack.className = "video-carousel-track";
        carouselTrack.style.display = "flex";
        carouselTrack.style.position = "absolute";
        carouselTrack.style.left = "0";
        carouselTrack.style.top = "0";
        carouselTrack.style.height = "100%"; // 设置高度为100%
        carouselTrack.style.padding = "20px";
        carouselTrack.style.boxSizing = "border-box";
        carouselTrack.style.transition = "transform 0.3s ease"; // 添加平滑过渡效果
        carouselTrack.style.overflow = "visible"; // 允许内容溢出轨道
        
        // 创建视频项数组
        const videoItems = [];
        
        // 处理每个视频单元格
        videoCells.forEach((cell, index) => {
            // 创建视频项容器
            const videoItem = document.createElement("div");
            videoItem.className = "video-carousel-item";
            videoItem.style.display = "flex";
            videoItem.style.flexDirection = "column";
            videoItem.style.alignItems = "center";
            videoItem.style.justifyContent = "flex-start"; // 从顶部开始对齐内容
            videoItem.style.minWidth = "600px"; // 设置最小宽度
            videoItem.style.maxWidth = "600px"; // 设置最大宽度
            videoItem.style.height = "100%"; // 设置高度为100%
            videoItem.style.margin = "0 10px"; // 减小左右间距为10px
            videoItem.style.boxSizing = "border-box";
            videoItem.style.position = "relative";
            videoItem.style.overflow = "visible"; // 允许内容溢出
            
            // 创建视频包装器，控制视频宽度和高度
            const videoWrapper = document.createElement("div");
            videoWrapper.className = "video-wrapper";
            videoWrapper.style.width = "100%";
            videoWrapper.style.maxWidth = "600px";
            videoWrapper.style.height = "350px"; // 视频容器高度
            videoWrapper.style.margin = "0 auto";
            videoWrapper.style.position = "relative";
            videoWrapper.style.overflow = "hidden"; // 隐藏溢出内容
            videoWrapper.style.zIndex = "1"; // 确保视频在上层
            
            // 获取视频元素
            const video = cell.querySelector("video");
            if (video) {
                // 克隆视频元素
                const clonedVideo = video.cloneNode(true);
                clonedVideo.style.width = "100%";
                clonedVideo.style.height = "100%"; // 设置高度为100%
                clonedVideo.style.objectFit = "cover"; // 确保视频填充容器
                clonedVideo.style.borderRadius = "8px"; // 视频圆角
                clonedVideo.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // 添加阴影
                
                // 将克隆的视频添加到视频包装器
                videoWrapper.appendChild(clonedVideo);
                
                // 获取折叠部分
                const collapsibleSection = cell.querySelector(".collapsible-section");
                if (collapsibleSection) {
                    // 创建一个包含按钮和内容的容器
                    const collapsibleContainer = document.createElement("div");
                    collapsibleContainer.className = "collapsible-container";
                    collapsibleContainer.style.width = "600px";
                    collapsibleContainer.style.position = "relative";
                    collapsibleContainer.style.marginTop = "10px";
                    collapsibleContainer.style.zIndex = "2";
                    collapsibleContainer.style.display = "flex";
                    collapsibleContainer.style.flexDirection = "column";
                    
                    // 克隆按钮
                    const button = collapsibleSection.querySelector("button").cloneNode(true);
                    button.style.width = "600px";
                    button.style.maxWidth = "600px";
                    button.style.boxSizing = "border-box";
                    button.style.zIndex = "2";
                    
                    // 获取原始折叠内容
                    const content = collapsibleSection.querySelector(".collapse-content");
                    
                    // 创建新的内容容器
                    const contentContainer = document.createElement("div");
                    contentContainer.className = "collapse-content";
                    contentContainer.innerHTML = content.innerHTML;
                    contentContainer.style.display = "none"; // 初始隐藏
                    contentContainer.style.width = "600px";
                    contentContainer.style.maxWidth = "600px";
                    contentContainer.style.boxSizing = "border-box";
                    contentContainer.style.position = "relative"; // 使用相对定位而非绝对定位
                    contentContainer.style.zIndex = "2"; // 确保不会超过其他元素
                    contentContainer.style.padding = "15px";
                    contentContainer.style.borderRadius = "0 0 8px 8px"; // 底部圆角
                    contentContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // 添加阴影
                    contentContainer.style.maxHeight = "none"; // 移除最大高度限制
                    contentContainer.style.overflowY = "visible"; // 允许内容溢出
                    contentContainer.style.backgroundColor = "#ffffff"; // 白色背景
                    contentContainer.style.border = "1px solid #e0e0e0"; // 添加浅灰色边框
                    contentContainer.style.marginBottom = "20px"; // 添加底部间距
                    
                    // 将按钮添加到折叠容器
                    collapsibleContainer.appendChild(button);
                    
                    // 将内容容器添加到折叠容器
                    collapsibleContainer.appendChild(contentContainer);
                    
                    // 修改按钮点击事件
                    button.addEventListener("click", function() {
                        // 获取所有内容容器
                        const allContentContainers = document.querySelectorAll('.collapse-content');
                        
                        // 切换内容显示状态
                        if (contentContainer.style.display === "none") {
                            // 先隐藏所有内容
                            allContentContainers.forEach(container => {
                                container.style.display = "none";
                            });
                            
                            // 更新所有按钮图标
                            const allButtons = document.querySelectorAll('button');
                            allButtons.forEach(btn => {
                                const btnIcon = btn.querySelector('.fas');
                                if (btnIcon) {
                                    btnIcon.classList.remove('fa-angle-up');
                                    btnIcon.classList.add('fa-angle-down');
                                }
                            });
                            
                            // 显示当前内容
                            contentContainer.style.display = "block";
                            
                            // 更新图标
                            const icon = button.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-down');
                                icon.classList.add('fa-angle-up');
                            }
                            
                            // 暂停轮播
                            isPaused = true;
                            carouselContainer.style.cursor = "default";
                            stopScroll();
                            
                            // 将内容克隆到展开区域
                            expandedContentArea.innerHTML = contentContainer.innerHTML;
                            expandedContentArea.style.display = "block";
                            
                            // 隐藏原始内容
                            contentContainer.style.display = "none";
                            
                            // 调整Abstract部分的位置 - 使用更精确的计算
                            setTimeout(() => {
                                // 获取展开内容区域的高度
                                const expandedHeight = expandedContentArea.offsetHeight;
                                
                                // 获取展开内容区域的位置
                                const expandedRect = expandedContentArea.getBoundingClientRect();
                                const expandedBottom = expandedRect.bottom;
                                
                                // 查找Abstract部分
                                const abstractSection = document.querySelector('.abstract-section, #abstract, .abstract');
                                if (abstractSection) {
                                    // 获取Abstract的位置
                                    const abstractRect = abstractSection.getBoundingClientRect();
                                    const abstractTop = abstractRect.top;
                                    
                                    // 计算需要的额外空间 - 只添加必要的空间
                                    // 如果Abstract顶部已经在展开内容底部之下，则不需要额外空间
                                    if (abstractTop < expandedBottom) {
                                        const neededSpace = expandedBottom - abstractTop + 2; // 只添加5px额外空间
                                        abstractSection.style.marginTop = neededSpace + 'px';
                                    }
                                }
                            }, 100);
                        } else {
                            // 隐藏内容
                            contentContainer.style.display = "none";
                            expandedContentArea.style.display = "none";
                            expandedContentArea.innerHTML = "";
                            
                            // 更新图标
                            const icon = button.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-up');
                                icon.classList.add('fa-angle-down');
                            }
                            
                            // 恢复轮播
                            isPaused = false;
                            carouselContainer.style.cursor = "grab";
                            startContinuousScroll();
                            
                            // 恢复Abstract部分的位置
                            const abstractSection = document.querySelector('.abstract-section, #abstract, .abstract');
                            if (abstractSection) {
                                abstractSection.style.marginTop = '';
                            }
                        }
                    });
                    
                    // 将折叠容器添加到视频项
                    videoItem.appendChild(videoWrapper);
                    videoItem.appendChild(collapsibleContainer);
                    
                    // 将视频项添加到数组
                    videoItems.push(videoItem);
                }
            }
        });
        
        // 计算轨道宽度
        const itemWidth = 620; // 每个项的宽度（包括间距）
        const originalTrackWidth = itemWidth * videoItems.length;
        
        // 将视频项添加到轨道
        videoItems.forEach(item => {
            carouselTrack.appendChild(item);
        });
        
        // 复制所有视频项并添加到轨道末尾，实现无缝循环
        if (videoItems.length > 0) {
            videoItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                
                // 为克隆项中的按钮添加点击事件
                const clonedButton = clonedItem.querySelector('button');
                const clonedContent = clonedItem.querySelector('.collapse-content');
                
                if (clonedButton && clonedContent) {
                    clonedButton.addEventListener("click", function() {
                        // 获取所有内容容器
                        const allContentContainers = document.querySelectorAll('.collapse-content');
                        
                        // 切换内容显示状态
                        if (clonedContent.style.display === "none") {
                            // 先隐藏所有内容
                            allContentContainers.forEach(container => {
                                container.style.display = "none";
                            });
                            
                            // 更新所有按钮图标
                            const allButtons = document.querySelectorAll('button');
                            allButtons.forEach(btn => {
                                const btnIcon = btn.querySelector('.fas');
                                if (btnIcon) {
                                    btnIcon.classList.remove('fa-angle-up');
                                    btnIcon.classList.add('fa-angle-down');
                                }
                            });
                            
                            // 显示当前内容
                            clonedContent.style.display = "block";
                            
                            // 更新图标
                            const icon = clonedButton.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-down');
                                icon.classList.add('fa-angle-up');
                            }
                            
                            // 暂停轮播
                            isPaused = true;
                            carouselContainer.style.cursor = "default";
                            stopScroll();
                            
                            // 将内容克隆到展开区域
                            expandedContentArea.innerHTML = clonedContent.innerHTML;
                            expandedContentArea.style.display = "block";
                            
                            // 隐藏原始内容
                            clonedContent.style.display = "none";
                            
                            // 调整Abstract部分的位置 - 使用更精确的计算
                            setTimeout(() => {
                                // 获取展开内容区域的高度
                                const expandedHeight = expandedContentArea.offsetHeight;
                                
                                // 获取展开内容区域的位置
                                const expandedRect = expandedContentArea.getBoundingClientRect();
                                const expandedBottom = expandedRect.bottom;
                                
                                // 查找Abstract部分
                                const abstractSection = document.querySelector('.abstract-section, #abstract, .abstract');
                                if (abstractSection) {
                                    // 获取Abstract的位置
                                    const abstractRect = abstractSection.getBoundingClientRect();
                                    const abstractTop = abstractRect.top;
                                    
                                    // 计算需要的额外空间 - 只添加必要的空间
                                    // 如果Abstract顶部已经在展开内容底部之下，则不需要额外空间
                                    if (abstractTop < expandedBottom) {
                                        const neededSpace = expandedBottom - abstractTop + 5; // 只添加5px额外空间
                                        abstractSection.style.marginTop = neededSpace + 'px';
                                    }
                                }
                            }, 100);
                        } else {
                            // 隐藏内容
                            clonedContent.style.display = "none";
                            expandedContentArea.style.display = "none";
                            expandedContentArea.innerHTML = "";
                            
                            // 更新图标
                            const icon = clonedButton.querySelector('.fas');
                            if (icon) {
                                icon.classList.remove('fa-angle-up');
                                icon.classList.add('fa-angle-down');
                            }
                            
                            // 恢复轮播
                            isPaused = false;
                            carouselContainer.style.cursor = "grab";
                            startContinuousScroll();
                            
                            // 恢复Abstract部分的位置
                            const abstractSection = document.querySelector('.abstract-section, #abstract, .abstract');
                            if (abstractSection) {
                                abstractSection.style.marginTop = '';
                            }
                        }
                    });
                }
                
                // 同样修改克隆项中的折叠内容容器样式
                const clonedCollapsibleContainer = clonedItem.querySelector('.collapsible-container');
                if (clonedCollapsibleContainer) {
                    clonedCollapsibleContainer.style.width = "600px";
                    clonedCollapsibleContainer.style.position = "relative";
                    clonedCollapsibleContainer.style.marginTop = "10px";
                    clonedCollapsibleContainer.style.zIndex = "2";
                    clonedCollapsibleContainer.style.display = "flex";
                    clonedCollapsibleContainer.style.flexDirection = "column";
                }
                
                // 同样修改克隆项中的折叠内容样式
                if (clonedContent) {
                    clonedContent.style.display = "none";
                    clonedContent.style.width = "600px";
                    clonedContent.style.maxWidth = "600px";
                    clonedContent.style.boxSizing = "border-box";
                    clonedContent.style.position = "relative";
                    clonedContent.style.zIndex = "2";
                    clonedContent.style.padding = "15px";
                    clonedContent.style.borderRadius = "0 0 8px 8px";
                    clonedContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                    clonedContent.style.maxHeight = "none";
                    clonedContent.style.overflowY = "visible";
                    clonedContent.style.backgroundColor = "#ffffff";
                    clonedContent.style.border = "1px solid #e0e0e0";
                    clonedContent.style.marginBottom = "20px";
                }
                
                carouselTrack.appendChild(clonedItem);
            });
            
            // 更新轨道宽度以包含复制的项
            const trackWidth = originalTrackWidth * 2; // 原始宽度的两倍
            carouselTrack.style.width = `${trackWidth}px`;
        }
        
        // 将轮播轨道添加到轮播容器
        carouselContainer.appendChild(carouselTrack);
        
        // 将轮播容器添加到包装容器
        carouselAndContentContainer.appendChild(carouselContainer);
        
        // 创建一个区域用于显示展开的内容
        const expandedContentArea = document.createElement("div");
        expandedContentArea.className = "expanded-content-area";
        expandedContentArea.style.width = "100%";
        expandedContentArea.style.display = "none"; // 初始隐藏
        expandedContentArea.style.marginTop = "10px";
        expandedContentArea.style.position = "relative";
        expandedContentArea.style.zIndex = "5";
        expandedContentArea.style.backgroundColor = "white";
        expandedContentArea.style.borderRadius = "8px";
        expandedContentArea.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        expandedContentArea.style.padding = "15px";
        expandedContentArea.style.boxSizing = "border-box";
        expandedContentArea.style.transition = "height 0.3s ease";
        
        // 将展开内容区域添加到包装容器
        carouselAndContentContainer.appendChild(expandedContentArea);
        
        // 将包装容器添加到页面
        videoContainer.innerHTML = ''; // 清空原有内容
        videoContainer.appendChild(carouselAndContentContainer);
        
        // 设置自动滚动
        let scrollPosition = 0;
        let scrollInterval;
        let isPaused = false;
        let isDragging = false;
        let startX, scrollLeft;
        
        // 开始连续滚动
        function startContinuousScroll() {
            stopScroll(); // 先停止之前的滚动
            
            scrollInterval = setInterval(() => {
                scrollPosition += 1; // 每次滚动1像素
                
                // 当滚动到复制部分的末尾时，无缝跳回到开始位置
                if (scrollPosition >= originalTrackWidth) {
                    // 暂时移除过渡效果，立即跳回到开始位置
                    carouselTrack.style.transition = 'none';
                    scrollPosition = 0;
                    carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
                    
                    // 强制重绘以确保过渡被移除
                    void carouselTrack.offsetWidth;
                    
                    // 恢复过渡效果
                    carouselTrack.style.transition = 'transform 0.3s ease';
                }
                
                carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
            }, 30); // 每30毫秒滚动一次，可以调整速度
        }
        
        // 停止滚动
        function stopScroll() {
            clearInterval(scrollInterval);
        }
        
        // 鼠标按下时开始拖动
        carouselContainer.addEventListener("mousedown", function(e) {
            if (isPaused) return; // 如果轮播已暂停，不允许拖动
            
            isDragging = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = scrollPosition;
            carouselTrack.style.transition = 'none'; // 拖动时移除过渡效果
            carouselContainer.style.cursor = 'grabbing'; // 更改光标样式
            stopScroll(); // 停止自动滚动
            
            e.preventDefault(); // 防止选中文本
        });
        
        // 鼠标移动时拖动
        carouselContainer.addEventListener("mousemove", function(e) {
            if (!isDragging) return;
            
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2; // 乘以2使拖动更敏感
            scrollPosition = scrollLeft - walk;
            
            // 边界检查
            if (scrollPosition < 0) {
                scrollPosition = 0;
            } else if (scrollPosition > originalTrackWidth) {
                scrollPosition = originalTrackWidth;
            }
            
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        // 鼠标释放时结束拖动
        carouselContainer.addEventListener("mouseup", function() {
            if (!isDragging) return;
            
            isDragging = false;
            carouselTrack.style.transition = 'transform 0.3s ease'; // 恢复过渡效果
            carouselContainer.style.cursor = 'grab'; // 恢复光标样式
            
            if (!isPaused) {
                startContinuousScroll(); // 恢复自动滚动
            }
        });
        
        // 鼠标离开时结束拖动
        carouselContainer.addEventListener("mouseleave", function() {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.transition = 'transform 0.3s ease';
                carouselContainer.style.cursor = 'grab';
                
                if (!isPaused) {
                    startContinuousScroll();
                }
            }
        });
        
        // 点击轮播区域（非按钮和非折叠内容）时关闭所有折叠内容并恢复滚动
        carouselContainer.addEventListener("click", function(e) {
            // 检查点击的元素是否是按钮或折叠内容或其子元素
            let target = e.target;
            let isButtonOrContent = false;
            
            while (target && target !== carouselContainer) {
                if (target.tagName === 'BUTTON' || target.classList.contains('collapse-content')) {
                    isButtonOrContent = true;
                    break;
                }
                target = target.parentElement;
            }
            
            // 如果点击的不是按钮或折叠内容，关闭所有折叠内容并恢复滚动
            if (!isButtonOrContent && isPaused) {
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