document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  const imageInput = document.getElementById('imageInput');
  const bgColor = document.getElementById('bgColor');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  const colorPickerContainer = document.getElementById('colorPickerContainer');
  const styleOptions = document.querySelectorAll('input[name="bgStyle"]');
  const colorPresets = document.querySelectorAll('.color-preset');
  const previewOverlay = document.querySelector('.preview-overlay');
  const dropZone = document.getElementById('dropZone');

  const DP_SIZE = 640;
  let currentImage = null;

  // Set initial canvas size
  canvas.width = DP_SIZE;
  canvas.height = DP_SIZE;

  // Initialize buttons as disabled
  downloadBtn.disabled = true;
  shareBtn.disabled = true;

  // Drag and drop functionality
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  });

  // Show/hide color picker based on style selection
  styleOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      if (e.target.value === 'solid') {
        colorPickerContainer.classList.add('visible');
      } else {
        colorPickerContainer.classList.remove('visible');
      }
      if (currentImage) {
        processImage(currentImage);
      }
    });
  });

  // Color preset functionality
  colorPresets.forEach(preset => {
    preset.addEventListener('click', () => {
      const color = preset.dataset.color;
      bgColor.value = color;
      colorPresets.forEach(p => p.classList.remove('active'));
      preset.classList.add('active');
      if (currentImage) {
        processImage(currentImage);
      }
    });
  });

  function handleImageUpload(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          currentImage = img;
          previewOverlay.classList.add('hidden');
          downloadBtn.disabled = false;
          shareBtn.disabled = false;
          processImage(img);
        };
        
        img.src = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  }

  function processImage(img) {
    // Clear canvas
    ctx.clearRect(0, 0, DP_SIZE, DP_SIZE);

    const scale = Math.min(DP_SIZE / img.width, DP_SIZE / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    const x = (DP_SIZE - width) / 2;
    const y = (DP_SIZE - height) / 2;

    // Get selected background style
    const selectedStyle = document.querySelector('input[name="bgStyle"]:checked').value;

    // Apply background based on selected method
    if (selectedStyle === 'blur') {
      applyBlurBackground(img, x, y, width, height);
    } else {
      // Solid color background
      ctx.fillStyle = bgColor.value;
      ctx.fillRect(0, 0, DP_SIZE, DP_SIZE);
    }

    // Draw main image
    ctx.drawImage(img, x, y, width, height);
  }

  function applyBlurBackground(img, x, y, width, height) {
    // Create temporary canvas for blur effect
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // Set temp canvas size to main canvas size
    tempCanvas.width = DP_SIZE;
    tempCanvas.height = DP_SIZE;
    
    // Draw the image larger to fill background
    const scale = Math.max(DP_SIZE / img.width, DP_SIZE / img.height);
    const bgWidth = img.width * scale;
    const bgHeight = img.height * scale;
    const bgX = (DP_SIZE - bgWidth) / 2;
    const bgY = (DP_SIZE - bgHeight) / 2;
    
    // Draw and blur background
    tempCtx.drawImage(img, bgX, bgY, bgWidth, bgHeight);
    tempCtx.filter = 'blur(20px)';
    tempCtx.drawImage(tempCanvas, 0, 0);
    
    // Draw blurred background to main canvas
    ctx.drawImage(tempCanvas, 0, 0);
  }

  // Event Listeners
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  });

  bgColor.addEventListener('input', () => {
    colorPresets.forEach(p => p.classList.remove('active'));
    if (currentImage) {
      processImage(currentImage);
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.download = 'whatsapp-dp.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  shareBtn.addEventListener('click', async () => {
    if (!currentImage) return;

    try {
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'whatsapp-dp.png', { type: 'image/png' });
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: 'WhatsApp DP',
            text: 'Check out my optimized WhatsApp DP!'
          });
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error sharing:', err);
    }
  });

  // Initialize color picker container visibility
  if (document.querySelector('input[name="bgStyle"]:checked').value === 'solid') {
    colorPickerContainer.classList.add('visible');
  }
});
