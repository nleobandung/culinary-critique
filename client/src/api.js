const API_URL = 'http://localhost:' + process.env.REACT_APP_PORT;


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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
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

export const createProfile = async (profile) => {
  try {
    const response = await fetch(`${API_URL}/profiles/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
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