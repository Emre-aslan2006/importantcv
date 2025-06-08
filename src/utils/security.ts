
export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Empty URLs are allowed
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove any potential XSS attempts
  const cleanUrl = url.replace(/javascript:/gi, '').replace(/data:/gi, '');
  
  // Add https if no protocol is specified
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    return `https://${cleanUrl}`;
  }
  
  return cleanUrl;
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File must be a valid image (JPEG, PNG, or WebP)' };
  }

  // Check file extension as additional security
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    return { isValid: false, error: 'Invalid file extension' };
  }

  return { isValid: true };
};
