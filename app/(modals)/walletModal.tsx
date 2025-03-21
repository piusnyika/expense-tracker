import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, spacingY, spacingX } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import ScreenWrapper from '@/components/ScreenWrapper';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Image } from 'expo-image';
import { getProfileImage } from '@/services/imageServices';
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/typo';
import Input from '@/components/input';
import { UserDataType, WalletType } from '@/types';
import Button from '@/components/button';
import { useAuth } from '@/contexts/authContext';
import { updateUser } from '@/services/userService';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '@/components/imageUpload';
import { createOrUpdateWallet } from '@/services/walletService';

const WalletModal = () => {
    const { user, updateUserData } = useAuth();
    const [wallet, setWallet] = useState<WalletType>({
        name: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const onSubmit = async () => {
        let { name } = wallet;
        if (!name.trim()) {
            Alert.alert('wallet', 'Please fill all the fields');
            return;
        }
        console.log('good to go');

        const data: WalletType = {
            name,
            image: null, // No image
            uid: user?.uid,
        };
        // todo: include wallet id if updating
        setLoading(true);
        const res = await createOrUpdateWallet(data);
        setLoading(false);
        console.log('result: ', res);
        if (res.success) {
            router.back();
        } else {
            Alert.alert('wallet', res.msg);
        }
    };

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title="New Wallet"
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />
                {/*form*/}
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputContainer}>
                        <Typo color={colors.neutral200}>Wallet Name</Typo>
                        <Input
                            placeholder="Salary"
                            value={wallet.name}
                            onChangeText={(value) => setWallet({ ...wallet, name: value })}
                        />
                    </View>
                    {/* Commenting out the image upload section */}
                     <View style={styles.inputContainer}>
                        <Typo color={colors.neutral200}>Wallet Icon</Typo>
                        <ImageUpload
                            file={wallet.image}
                            onClear={() => setWallet({ ...wallet, image: null })}
                            onSelect={(file) => setWallet({ ...wallet, image: file })}
                            placeholder="Upload Image"
                        />
                    </View> 
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                    <Typo color={colors.black} fontWeight={'700'}>
                        Add Wallet
                    </Typo>
                </Button>
            </View>
        </ModalWrapper>
    );
};

export default WalletModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingY._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    avatar: {
        alignSelf: 'center',
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
        // overflow: "hidden",
        //position: "relative",
    },
    editIcon: {
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._10,
    },
});