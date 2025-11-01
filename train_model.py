
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Load the dataset
df = pd.read_csv('farm2.csv')

# Define features (X) and target (y)
features = ['district', 'season', 'variety', 'soil_type', 'rainfall_mm', 'temperature_C', 'humidity_percent', 'area_hectare']
target = 'production_tonnes'

X = df[features]
y = df[target]

# Preprocessing for categorical features
categorical_features = ['district', 'season', 'variety', 'soil_type']
one_hot_encoder = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', one_hot_encoder, categorical_features)
    ],
    remainder='passthrough'
)

# Create a pipeline with preprocessing and the model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
score = model.score(X_test, y_test)
print(f'Model R^2 score: {score:.2f}')

# Save the trained model
joblib.dump(model, 'yield_prediction_model.joblib')

print("Model training complete and model saved as 'yield_prediction_model.joblib'")
