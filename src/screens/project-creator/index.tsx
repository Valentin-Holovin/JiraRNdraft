/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Text, TextInput} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components';
import {useNavigator, useProjects, useValidation} from '../../hooks';

export const ProjectCreator = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const {validateField} = useValidation();
  const {loading, createProject} = useProjects();
  const {goToBack} = useNavigator();

  const createNewProject = React.useCallback(() => {
    const isTitleValid = validateField('title', title);
    const isDescriptionValid = validateField('description', description);
    if (isTitleValid && isDescriptionValid) {
      createProject(title, description, goToBack);
    }
  }, [title, description]);

  return (
    <View style={styles.container}>
      <Header title="Project Creator" isBack />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Create New Project</Text>

        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Title"
            variant="outlined"
            value={title}
            onChangeText={setTitle}
            onBlur={() => validateField('title', title)}
          />
        </View>
        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Description"
            variant="outlined"
            value={description}
            onChangeText={setDescription}
            onBlur={() => validateField('description', description)}
          />
        </View>

        <View style={styles.button_wrapper}>
          <Button
            style={styles.button}
            title="CREATE NEW PROJECT"
            onPress={createNewProject}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  input_wrapper: {
    marginTop: 10,
  },
  button_wrapper: {
    marginTop: 10,
  },
  button: {
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});
