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
      const { fileName } = await response.json();
      return { success: true, message: 'File uploaded successfully', fileName };
    } else {
      const errorMessage = await response.text();
      return { success: false, message: `Failed to upload file: ${errorMessage}`, fileName: null };
    }

  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, message: `Error uploading file: ${error.message}`, fileName: null };
  }
};


///////////////////////////////////////////////////////////////////////////
//  API calls for users
///////////////////////////////////////////////////////////////////////////
export const getUserComments = async(username) => {
  try {
    const response = await fetch(`${API_URL}/users/get-comments?username=${encodeURIComponent(username)}`);

    if (!response.ok) {
      throw new Error(`Error fetching user comments: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
}

export const getProfilePhoto = async(username) => {
  try {
    const response = await fetch(`${API_URL}/users/get-profile-photo?username=${encodeURIComponent(username)}`);

    if (!response.ok) {
      throw new Error(`Error fetching profile photo: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching profile photo:', error);
    throw error;
  }
};

export const uploadProfilePhoto = async (username, image) => {
  try {
    const { success, message, fileName } = await uploadImage(image);

    if (success) {
      const response = await fetch(`${API_URL}/users/change-profile-photo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fileName })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(`Failed to upload profile photo: ${errorData.message}`);
        console.error('Upload profile photo failed:', errorData.message);
      }

    } else {
      alert(message);
      console.error('Upload profile photo failed:', message);
    }
  } catch (error) {
    console.error('Upload profile photo failed:', error);
    throw error;
  }
};

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

export const addComment = async (profileName, username, text) => {
  try {
    console.log(profileName);
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

export const getProfileNamesAndImages = async () => {
  try {
    const response = await fetch(`${API_URL}/profiles/profileNamesImages`);
    if (!response.ok) {
      throw new Error(`Error retrieving profile names and images: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving profile names and images:', error);
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

export const getUserRating = async (username, profileName) => {
  try {
    const encodedUsername = encodeURIComponent(username);
    const encodedProfileName = encodeURIComponent(profileName);

    const response = await fetch(`${API_URL}/profiles/userRating?username=${encodedUsername}&profileName=${encodedProfileName}`);

    if (!response.ok) {
      throw new Error(`Error retrieving user rating: ${response.statusText}`);
    }
    const { userRating } = await response.json();
    return userRating;

  } catch (error) {
    console.error('Error retrieving user rating:', error);
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

///////////////////////////////////////////////////////////////////////////
//  API calls for user profiles
///////////////////////////////////////////////////////////////////////////

//fetching users' display names
export const getDisplayName = async () => {
  try {
    const response = await fetch(`${API_URL}/users/usr/display-names`);

    if (!response.ok) {
      throw new Error(`Error retrieving display names: ${response.statusText}`);
    }

    const names = await response.json();
    return names;

  } catch (error) {
    console.error('Error retrieving display names:', error);
    throw error;
  }
}


//fetching users' followers status Array 
export const getFollowers = async (user) => {
  try {
    console.log("my brother in christ I am trying to fetch")
    // const response = await fetch(`${API_URL}/users/usr/followers`, {
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({username: user})
    // });

    const response = await fetch(`${API_URL}/users/usr/followers/status?username=${encodeURIComponent(user)}`);

    if (!response.ok) {
      throw new Error(`Error retrieving followers: ${response.statusText}`);
    }

    const names = await response.json();
    return names;

  } catch (error) {
    console.error('Error retrieving followers:', error);
    throw error;
  }
}

//fetching followers id array
export const getFollowersID = async (user) => {
  try {

    const response = await fetch(`${API_URL}/users/usr/followers/id?username=${encodeURIComponent(user)}`);

    if (!response.ok) {
      throw new Error(`Error retrieving followers IDs: ${response.statusText}`);
    }

    const ids = await response.json();
    return ids;

  } catch (error) {
    console.error('Error retrieving followers IDs:', error);
    throw error;
  }
}

//fetching user ids
export const getFollowersUser = async (user) => {
  try {

    const response = await fetch(`${API_URL}/users/usr/followers/usernames?username=${encodeURIComponent(user)}`);

    if (!response.ok) {
      throw new Error(`Error retrieving followers usernames: ${response.statusText}`);
    }

    const ids = await response.json();
    return ids;

  } catch (error) {
    console.error('Error retrieving followers usernames:', error);
    throw error;
  }
}
