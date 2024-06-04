const API_URL = `http://localhost:${process.env.REACT_APP_PORT}`;

///////////////////////////////////////////////////////////////////////////
//  API calls for AWS S3 Bucket
///////////////////////////////////////////////////////////////////////////
export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('File uploaded successfully');
    } else {
      alert('Failed to upload file.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


///////////////////////////////////////////////////////////////////////////
//  API calls for users
///////////////////////////////////////////////////////////////////////////
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error creating user: ${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Error logging in: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////
//  API calls for profiles
///////////////////////////////////////////////////////////////////////////
export const getComments = async (profileName) => {
  try {
    const response = await fetch(`${API_URL}/profiles/comments?profileName=${encodeURIComponent(profileName)}`);

    if (!response.ok) {
      throw new Error(`Error retrieving profile comments: ${response.statusText}`);
    }

    const comments = await response.json();
    return comments;

  } catch (error) {
    console.error('Error retrieving profile comments:', error);
    throw error;
  }
}

export const addComment = async ({ profileName, username, text }) => {
  try {
    const response = await fetch(`${API_URL}/profiles/addComment?profileName=${encodeURIComponent(profileName)}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, text })
    });

    if (!response.ok) {
      throw new Error(`Error adding comment: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export const getProfileNames = async () => {
  try {
    const response = await fetch(`${API_URL}/profiles/profileNames`);
    if (!response.ok) {
      throw new Error(`Error retrieving profile names: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving profile names:', error);
    throw error;
  }
}

export const getTop5 = async () => {
  try {
    const response = await fetch(`${API_URL}/profiles/top5`, {
      method: 'GET',
      headers: {
        'content-type': 'applcation/json'
      },
    });
    if (!response.ok) {
      throw new Error(`Error retrieving average ratings: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving top 5:', error);
    throw error;
  }
};

export const getProfileInfo = async (name) => {
  try {
    const response = await fetch(`${API_URL}/profiles/profileInfo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ name })
    });
    if (!response.ok) {
      throw new Error(`Error fetching rating count: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rating count:', error);
    throw error;
  }
};

export const rateProfile = async ({ name, stars, username }) => {
  try {
    const response = await fetch(`${API_URL}/profiles/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, stars, username }),
    });
    if (!response.ok) {
      throw new Error(`Error rating profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error rating profile:', error);
    throw error;
  }
};

export const createProfile = async (profileName) => {
  try {
    const response = await fetch(`${API_URL}/profiles/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: profileName }),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};